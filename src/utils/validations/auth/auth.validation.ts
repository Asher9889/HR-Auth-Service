export const createTenantSchema = {
    body: {
      type: "object",
      required: ["name", "tenantCode", "contact", "subscription", "preferences"],
      properties: {
        name: { type: "string", minLength: 3, maxLength: 100 },
        domain: { type: "string", format: "hostname" }, // optional
        tenantCode: { type: "string", minLength: 3, maxLength: 20 },
  
        contact: {
          type: "object",
          required: ["adminName", "email"],
          properties: {
            adminName: { type: "string", minLength: 3 },
            email: { type: "string", format: "email" },
            phone: { type: "string", minLength: 7, maxLength: 15 }
          },
          additionalProperties: false
        },
  
        address: {
          type: "object",
          properties: {
            line1: { type: "string" },
            line2: { type: "string" },
            city: { type: "string" },
            state: { type: "string" },
            country: { type: "string" },
            zip: { type: "string" }
          },
          additionalProperties: false
        },
  
        subscription: {
          type: "object",
          required: ["plan", "status", "startDate", "maxUsers"],
          properties: {
            plan: { type: "string", enum: ["Free", "Pro", "Enterprise"] },
            status: { type: "string", enum: ["Active", "Inactive", "Cancelled"] },
            startDate: { type: "string", format: "date-time" },
            endDate: { type: "string", format: "date-time" },
            maxUsers: { type: "integer", minimum: 1 },
            features: {
              type: "array",
              items: { type: "string" },
              default: []
            }
          },
          additionalProperties: false
        },
  
        preferences: {
          type: "object",
          required: ["timezone", "dateFormat", "currency", "language"],
          properties: {
            timezone: { type: "string", default: "Asia/Kolkata" },
            dateFormat: { type: "string", enum: ["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD"], default: "DD-MM-YYYY" },
            currency: { type: "string", default: "INR" },
            language: { type: "string", default: "en" }
          },
          additionalProperties: false
        },
  
        status: { type: "string", enum: ["Active", "Suspended", "Deleted"], default: "Active" }
      },
      additionalProperties: false
    }
};
  