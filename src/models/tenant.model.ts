import { Schema, model, Document, Model, Types } from "mongoose";

export interface ISubscription {
  plan: "Free" | "Pro" | "Enterprise";
  status: "Active" | "Inactive" | "Cancelled";
  startDate: Date;
  endDate?: Date;
  maxUsers: number;
  features: string[];
}

export interface IPreferences {
  timezone: string;
  dateFormat: string;
  currency: string;
  language: string;
}

export interface IContact {
  adminName: string;
  email: string;
  phone?: string;
}

export interface IAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface ITenant extends Document {
  _id: Types.ObjectId;   // 👈 tells TS that _id is always ObjectId
  name: string;
  domain?: string;
  tenantCode: string;
  contact: IContact;
  address?: IAddress;
  subscription: ISubscription;
  preferences: IPreferences;
  status: "Active" | "Suspended" | "Deleted";
  createdAt: Date;
  updatedAt: Date;

  // Instance methods
  hasFeature(feature: string): boolean;
  isSubscriptionActive(): boolean;
  setStatus(newStatus: "Active" | "Suspended" | "Deleted"): Promise<ITenant>;
}

export interface ITenantModel extends Model<ITenant> {
  findByDomain(domain: string): Promise<ITenant | null>;
  findByCode(code: string): Promise<ITenant | null>;
}

const tenantSchema = new Schema<ITenant, ITenantModel>(
  {
    name: { type: String, required: true, trim: true },
    domain: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    tenantCode: { type: String, unique: true, required: true, uppercase: true },
    contact: {
      adminName: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String },
    },
    address: {
      line1: { type: String },
      line2: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: String },
    },
    subscription: {
      plan: { type: String, enum: ["Free", "Pro", "Enterprise"], default: "Free" },
      status: { type: String, enum: ["Active", "Inactive", "Cancelled"], default: "Active" },
      startDate: { type: Date, default: Date.now },
      endDate: { type: Date },
      maxUsers: { type: Number, default: 50 },
      features: [{ type: String }],
    },
    preferences: {
      timezone: { type: String, default: "Asia/Kolkata" },
      dateFormat: { type: String, default: "DD-MM-YYYY" },
      currency: { type: String, default: "INR" },
      language: { type: String, default: "en" },
    },
    status: { type: String, enum: ["Active", "Suspended", "Deleted"], default: "Active" },
  },
  { timestamps: true }
);

// -------------------- INDEXES --------------------
// tenantSchema.index({ domain: 1 }, { unique: true, sparse: true });
tenantSchema.index({ tenantCode: 1 }, { unique: true });
tenantSchema.index({ status: 1 });

// -------------------- METHODS --------------------
tenantSchema.methods.hasFeature = function (feature: string): boolean {
  return this.subscription.features.includes(feature);
};

tenantSchema.methods.isSubscriptionActive = function (): boolean {
  const now = new Date();
  return (
    this.subscription.status === "Active" &&
    (!this.subscription.endDate || now <= this.subscription.endDate)
  );
};

tenantSchema.methods.setStatus = async function (
    this: ITenant, 
    newStatus: "Active" | "Suspended" | "Deleted"
): Promise<ITenant> {
  this.status = newStatus;
  await this.save();
  return this;
};

// -------------------- STATICS --------------------
tenantSchema.statics.findByDomain = function (domain: string) {
  return this.findOne({ domain: domain.toLowerCase(), status: "Active" });
};

tenantSchema.statics.findByCode = function (code: string) {
  return this.findOne({ tenantCode: code.toUpperCase(), status: "Active" });
};

// -------------------- MODEL --------------------
const Tenant = model<ITenant, ITenantModel>("Tenant", tenantSchema);

export default Tenant;
