import { Schema, model, Document, Types } from 'mongoose';
import { argon2 } from '../utils';

export interface IUser extends Document {
  _id: Types.ObjectId;
  tenantId: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Manager" | "Employee" | "User" | "HR";
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin?: Date;
  profileCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    tenantId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Tenant', 
      required: true 
    },
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: true,
      select: false
    },
    role: { 
      type: String, 
      enum: ['Admin', 'Manager', 'Employee'], 
      default: 'Employee' 
    },
    status: { 
      type: String, 
      enum: ['Active', 'Inactive', 'Suspended'], 
      default: 'Active' 
    },
    lastLogin: { 
      type: Date 
    },
    profileCompleted: { 
      type: Boolean, 
      default: false 
    }
  },
  { 
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        // Create a new object without the password and __v fields
        const { password, __v, ...result } = ret;
        return result;
      }
    }
  }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await argon2.hashPassword(this.password);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (password: string) {
  return await argon2.verifyPassword(this.password, password);
};

userSchema.index({ email: 1, tenantId: 1 }, { unique: true });

const User = model<IUser>('User', userSchema);

export default User;
