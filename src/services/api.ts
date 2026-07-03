// services/api.ts
const USE_MOCK = true;                            // ← CHANGE TO false WHEN BACKEND IS READY
const BASE_URL = "https://your-backend.com/api";  // ← CHANGE TO REAL URL

const mock = {
  candidate: {
    id: "demo-candidate",
    name: "Emeka Obi",
    email: "emeka@example.com",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    institution: "FUTO",
    field: "Computer Engineering",
    graduationYear: 2026,
    skills: ["Solidity", "React", "Node.js"]
  },
  credentials: [
    { id: 1, title: "B.Eng Computer Engineering", issuer: "FUTO", status: "verified", year: 2026, txHash: "5f2a9c1d...e8b3" },
    { id: 2, title: "Cisco CCNA", issuer: "NIIT", status: "pending", year: 2025 }
  ],
  notifications: [
    { id: 1, type: "approved", message: "FUTO approved your B.Eng credential", read: false, date: "2026-06-15" },
    { id: 2, type: "denied", message: "FUTO denied your CCNA request — ID mismatch", read: true, date: "2026-06-14" }
  ],
  requests: [
    { id: 1, issuer: "FUTO", credential: "B.Eng Computer Engineering", status: "pending", date: "2026-06-10" },
    { id: 2, issuer: "NIIT", credential: "Cisco CCNA", status: "approved", date: "2026-06-08" }
  ],
  issuerRequests: [
    { id: 1, candidate: "Emeka Obi", matric: "FUT/2023/001", credential: "B.Eng Computer Engineering", status: "pending", date: "2026-06-10" },
    { id: 2, candidate: "Ada Nwosu", matric: "FUT/2023/042", credential: "B.Eng Electrical Engineering", status: "approved", date: "2026-06-08" }
  ],
  verifier: {
    id: "demo-verifier",
    name: "Tunde Bello",
    company: "Paystack",
    email: "tunde@paystack.com"
  },
  publicProfile: {
    candidateId: "demo-candidate",
    name: "Emeka Obi",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    credentials: [
      { title: "B.Eng Computer Engineering", issuer: "FUTO", verified: true, year: 2026 }
    ]
  },
  qr: {
    qr_image_url: "https://api.qrserver.com/v1/create-qr-code/?data=credchain/verify/demo-candidate&size=200x200"
  },
  resume: {
    resume_html: "<h2>Emeka Obi</h2><p>Computer Engineering graduate from FUTO with skills in Solidity, React and Node.js.</p>"
  },
  issuerRecords: {
    "FUT/2023/001": {
      name: "Emeka Obi",
      course: "Computer Engineering",
      status: "Graduated",
      graduationYear: 2026,
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    "FUT/2023/042": {
      name: "Ada Nwosu",
      course: "Electrical Engineering",
      status: "Graduated",
      graduationYear: 2026,
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    }
  }
};

async function get(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  return res.json();
}

async function post(endpoint: string, body: any) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function getCandidate(id: string) {
  if (USE_MOCK) {
    const storedUserStr = localStorage.getItem("cc_user");
    if (storedUserStr) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        if (storedUser.role === "candidate" || storedUser.email) {
          return {
            id: "custom-candidate",
            name: storedUser.fullName || storedUser.name || "Custom Candidate",
            email: storedUser.email || "candidate@example.com",
            photo: storedUser.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
            institution: storedUser.institution || "FUTO",
            field: storedUser.fieldOfStudy || storedUser.field || "Computer Engineering",
            graduationYear: Number(storedUser.graduationYear) || 2026,
            skills: storedUser.skills || ["Solidity", "React", "Node.js"]
          };
        }
      } catch (e) {
        console.error(e);
      }
    }
    return mock.candidate;
  }
  return get(`/candidates/${id}`);
}
export async function getCredentials(id: string)       { return USE_MOCK ? mock.credentials       : get(`/candidates/${id}/credentials`) }
export async function getNotifications(id: string)     { return USE_MOCK ? mock.notifications     : get(`/candidates/${id}/notifications`) }
export async function getRequests(id: string)          { return USE_MOCK ? mock.requests          : get(`/candidates/${id}/requests`) }
export async function getIssuerRequests(id: string)    { return USE_MOCK ? mock.issuerRequests    : get(`/issuers/${id}/requests`) }
export async function getPublicProfile(id: string)     { return USE_MOCK ? mock.publicProfile     : get(`/verify/${id}`) }
export async function getQRCode(id: string, scope: string = "all") { return USE_MOCK ? mock.qr  : get(`/candidates/${id}/qr?scope=${scope}`) }
export async function buildResume(id: string, prompt: string)  { return USE_MOCK ? mock.resume    : post(`/resume/generate`, { candidateId: id, prompt }) }

export async function signup(payload: any) {
  if (USE_MOCK) {
    return {
      success: true,
      user: {
        id: "user-" + Date.now(),
        name: payload.fullName || payload.instName || payload.companyName || payload.name || "New User",
        email: payload.email || payload.contactEmail || payload.workEmail,
        role: payload.role || "candidate",
        status: payload.role === "candidate" ? "active" : "pending"
      }
    };
  }
  return post("/auth/signup", payload);
}

export async function login(email: string, password?: string) {
  if (USE_MOCK) {
    const storedUserStr = localStorage.getItem("cc_user");
    if (storedUserStr) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        if (storedUser.email === email || storedUser.contactEmail === email || storedUser.workEmail === email) {
          return {
            success: true,
            user: {
              id: storedUser.role === "candidate" ? "custom-candidate" : storedUser.role === "issuer" ? "custom-issuer" : "custom-verifier",
              name: storedUser.fullName || storedUser.instName || storedUser.name || "Custom User",
              email,
              role: storedUser.role,
              status: "active"
            }
          };
        }
      } catch (e) {
        console.error(e);
      }
    }

    let role = "candidate";
    let name = "Emeka Obi";
    if (email.includes("issuer") || email.includes("futo")) {
      role = "issuer";
      name = "Federal University of Technology Owerri";
    } else if (email.includes("verifier") || email.includes("paystack") || email.includes("tunde")) {
      role = "verifier";
      name = "Tunde Bello";
    }
    return {
      success: true,
      user: {
        id: role === "candidate" ? "demo-candidate" : role === "issuer" ? "demo-issuer" : "demo-verifier",
        name,
        email,
        role,
        status: "active"
      }
    };
  }
  return post("/auth/login", { email, password });
}

export async function verifyMatch(candidateData: any, issuerDocId: string) {
  if (USE_MOCK) {
    return { matchScore: 0.97, mismatches: [] };
  }
  return post(`/credentials/verify-match`, { candidateData, issuerDocId });
}

export async function issueCredential(requestId: any, candidateId: any, issuerId: any) {
  if (USE_MOCK) {
    return { success: true, txHash: "5f2a9c1d...e8b3", status: "confirmed" };
  }
  return post(`/credentials/issue`, { requestId, candidateId, issuerId });
}

export function getIssuerRecord(matric: string) {
  return (mock.issuerRecords as any)[matric] || null;
}

const WHITELISTED_INSTITUTIONS_MOCK = [
  "Federal University of Technology Owerri (FUTO)",
  "University of Lagos (UNILAG)",
  "University of Nigeria Nsukka (UNN)",
  "Obafemi Awolowo University (OAU)",
  "Ahmadu Bello University (ABU)",
  "University of Ibadan (UI)",
  "Lagos State University (LASU)",
  "Covenant University",
  "Babcock University",
  "Pan-Atlantic University (PAU)"
];

export async function getWhitelistedInstitutions(): Promise<string[]> {
  if (USE_MOCK) return WHITELISTED_INSTITUTIONS_MOCK;
  const res = await fetch(`${BASE_URL}/institutions/whitelisted`);
  return res.json();
}

