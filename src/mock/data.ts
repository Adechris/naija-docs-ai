import { DOCUMENT_TYPES } from "@/lib/documentTypes";

export type SavedDocument = {
  id: string;
  name: string;
  typeId: string;
  createdAt: string;
  editedAt: string;
  words: number;
  pages: number;
  starred: boolean;
  status: "Completed" | "Draft";
};

export const MOCK_DOCUMENTS: SavedDocument[] = [
  {
    id: "d1",
    name: "Employment Contract — Adeyinka Fashola",
    typeId: "employment-contract",
    createdAt: "2026-08-16",
    editedAt: "2026-08-17",
    words: 862,
    pages: 3,
    starred: true,
    status: "Completed",
  },
  {
    id: "d2",
    name: "Business Proposal — Zenith Retail Ltd",
    typeId: "business-proposal",
    createdAt: "2026-08-14",
    editedAt: "2026-08-15",
    words: 1120,
    pages: 4,
    starred: true,
    status: "Completed",
  },
  {
    id: "d3",
    name: "NDA — Paystack Integration Talks",
    typeId: "nda",
    createdAt: "2026-08-12",
    editedAt: "2026-08-12",
    words: 640,
    pages: 2,
    starred: false,
    status: "Completed",
  },
  {
    id: "d4",
    name: "Commercial Invoice — INV-2026-0142",
    typeId: "commercial-invoice",
    createdAt: "2026-08-10",
    editedAt: "2026-08-10",
    words: 310,
    pages: 1,
    starred: false,
    status: "Completed",
  },
  {
    id: "d5",
    name: "Query Letter — Late Resumption",
    typeId: "query-letter",
    createdAt: "2026-08-08",
    editedAt: "2026-08-09",
    words: 280,
    pages: 1,
    starred: false,
    status: "Draft",
  },
  {
    id: "d6",
    name: "Tenancy Agreement — Lekki Phase 1 Duplex",
    typeId: "tenancy-agreement",
    createdAt: "2026-08-04",
    editedAt: "2026-08-06",
    words: 940,
    pages: 3,
    starred: false,
    status: "Completed",
  },
];

export const MOCK_USERS = [
  {
    id: "u1",
    name: "Adeyinka Fashola",
    email: "adeyinka@zenithretail.ng",
    type: "Business",
    plan: "Professional",
    docs: 42,
    joined: "2026-03-11",
    lastActive: "2026-08-18",
    status: "Active",
  },
  {
    id: "u2",
    name: "Chiamaka Obi",
    email: "chiamaka.obi@gmail.com",
    type: "Individual",
    plan: "Free",
    docs: 3,
    joined: "2026-08-15",
    lastActive: "2026-08-18",
    status: "Trial",
  },
  {
    id: "u3",
    name: "Musa Ibrahim",
    email: "musa@kanoagrotech.com",
    type: "Business",
    plan: "Business",
    docs: 168,
    joined: "2025-11-02",
    lastActive: "2026-08-17",
    status: "Active",
  },
  {
    id: "u4",
    name: "Tolu Ajayi",
    email: "tolu@ajayilegal.ng",
    type: "Business",
    plan: "Professional",
    docs: 77,
    joined: "2026-01-19",
    lastActive: "2026-08-16",
    status: "Past Due",
  },
  {
    id: "u5",
    name: "Blessing Effiong",
    email: "blessing.effiong@outlook.com",
    type: "Individual",
    plan: "Professional",
    docs: 24,
    joined: "2026-06-08",
    lastActive: "2026-08-18",
    status: "Active",
  },
  {
    id: "u6",
    name: "Emeka Nwosu",
    email: "emeka@phlogistics.ng",
    type: "Business",
    plan: "Free",
    docs: 2,
    joined: "2026-08-17",
    lastActive: "2026-08-18",
    status: "Trial",
  },
];

export const REVENUE_SERIES = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  revenue: 180000 + Math.round(Math.sin(i / 2.4) * 46000) + i * 5200,
  signups: 8 + ((i * 7) % 14),
  documents: 120 + ((i * 23) % 90),
}));

export const POPULAR_TYPES = [
  { name: "Employment Contract", value: 23 },
  { name: "Business Proposal", value: 19 },
  { name: "Commercial Invoice", value: 15 },
  { name: "NDA", value: 11 },
  { name: "Service Agreement", value: 9 },
  { name: "Tenancy Agreement", value: 7 },
];

export const PLAN_DISTRIBUTION = [
  { name: "Free", value: 1240 },
  { name: "Professional", value: 684 },
  { name: "Business", value: 152 },
];

export const ACTIVITY_FEED = [
  { who: "Chiamaka Obi", what: "generated an Employment Contract", when: "2 mins ago" },
  { who: "Musa Ibrahim", what: "upgraded to Business", when: "5 mins ago" },
  { who: "Emeka Nwosu", what: "signed up (free trial)", when: "8 mins ago" },
  { who: "Tolu Ajayi", what: "payment failed — ₦8,000", when: "22 mins ago" },
  { who: "Blessing Effiong", what: "downloaded Invoice as PDF", when: "35 mins ago" },
];

export const PAYMENTS = [
  { id: "p1", user: "Adeyinka Fashola", plan: "Professional", amount: 8000, date: "2026-08-18", next: "2026-09-18", status: "Active", ref: "PSK_9F2A11" },
  { id: "p2", user: "Musa Ibrahim", plan: "Business", amount: 20000, date: "2026-08-16", next: "2026-09-16", status: "Active", ref: "PSK_7B88C2" },
  { id: "p3", user: "Tolu Ajayi", plan: "Professional", amount: 8000, date: "2026-08-15", next: "—", status: "Past Due", ref: "PSK_31D0FE" },
  { id: "p4", user: "Blessing Effiong", plan: "Professional", amount: 8000, date: "2026-08-12", next: "2026-09-12", status: "Active", ref: "PSK_55AA09" },
  { id: "p5", user: "Chiamaka Obi", plan: "Free Trial", amount: 0, date: "2026-08-15", next: "2026-08-29", status: "Trial", ref: "—" },
];

export const SAMPLE_DOCUMENT = `CONTRACT OF EMPLOYMENT

THIS CONTRACT OF EMPLOYMENT is made this 18th day of August, 2026

BETWEEN

ZENITH RETAIL LIMITED, a company incorporated under the Companies and Allied Matters Act 2020 with RC Number 1849302, whose registered office is at 14B Adeola Odeku Street, Victoria Island, Lagos ("the Employer");

AND

MR. ADEYINKA FASHOLA of 22 Bode Thomas Street, Surulere, Lagos ("the Employee").

1. COMMENCEMENT AND PROBATION
1.1 The Employee's employment shall commence on 01/09/2026 and shall be subject to a probationary period of three (3) months.

2. POSITION AND DUTIES
2.1 The Employee is engaged in the position of Operations Manager and shall perform such duties as may reasonably be assigned by the Employer.

3. REMUNERATION
3.1 The Employer shall pay the Employee a gross monthly salary of ₦850,000 (Eight Hundred and Fifty Thousand Naira), payable on the 25th day of each month.
3.2 The Employer shall remit pension contributions in accordance with the Pension Reform Act 2014 (PenCom).

4. WORKING HOURS
4.1 Normal working hours shall be eight (8) hours per day and forty (40) hours per week, in line with the Labour Act, Cap L1, LFN 2004.

5. ANNUAL LEAVE
5.1 The Employee shall be entitled to twenty-one (21) working days of paid annual leave per calendar year, exceeding the statutory minimum prescribed by the Labour Act 2004.

6. TERMINATION
6.1 Either party may terminate this contract by giving one (1) month written notice, or payment of salary in lieu of notice.

7. CONFIDENTIALITY
7.1 The Employee shall not, during or after employment, disclose any confidential information belonging to the Employer.

8. GOVERNING LAW AND DISPUTE RESOLUTION
8.1 This Contract shall be governed by the laws of the Federal Republic of Nigeria and disputes shall be subject to the jurisdiction of the National Industrial Court of Nigeria.

IN WITNESS WHEREOF the parties have executed this Contract on the date first above written.

_____________________________        _____________________________
For: ZENITH RETAIL LIMITED            ADEYINKA FASHOLA
(Employer)                            (Employee)`;

export const DOC_TYPE_COUNT = DOCUMENT_TYPES.length;
