interface JWTPayload {
    userId: string;
    tenantId: string;
    role: "Admin" | "Manager" | "Employee" | "User" | "HR";
}

export { JWTPayload }