export type DocCategory = "business" | "legal" | "hr" | "finance";

export type DocumentType = {
  id: string;
  name: string;
  icon: string;
  category: DocCategory;
  description: string;
  seconds: number;
  nigerianContext?: boolean;
};

export const CATEGORY_LABELS: Record<DocCategory, string> = {
  business: "Business Documents",
  legal: "Legal & Contracts",
  hr: "HR Documents",
  finance: "Finance Documents",
};

export const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: "business-proposal",
    name: "Business Proposal",
    icon: "📋",
    category: "business",
    description: "Pitch your services or products to potential clients",
    seconds: 12,
  },
  {
    id: "company-profile",
    name: "Company Profile",
    icon: "🏢",
    category: "business",
    description: "Professional overview of your company for partnerships",
    seconds: 10,
  },
  {
    id: "business-plan",
    name: "Business Plan Summary",
    icon: "📊",
    category: "business",
    description: "Executive summary business plan for investors or banks",
    seconds: 15,
  },
  {
    id: "mou",
    name: "Memorandum of Understanding",
    icon: "🤝",
    category: "business",
    description: "Formal agreement between parties outlining intentions",
    seconds: 10,
  },
  {
    id: "partnership-agreement",
    name: "Partnership Agreement",
    icon: "🏛️",
    category: "business",
    description: "Define terms of a business partnership clearly",
    seconds: 12,
    nigerianContext: true,
  },
  {
    id: "board-resolution",
    name: "Board Resolution",
    icon: "📜",
    category: "business",
    description: "Formal company decision document for CAC purposes",
    seconds: 8,
    nigerianContext: true,
  },
  {
    id: "service-agreement",
    name: "Service Agreement",
    icon: "📄",
    category: "legal",
    description: "Contract for services between client and provider",
    seconds: 12,
    nigerianContext: true,
  },
  {
    id: "nda",
    name: "Non-Disclosure Agreement",
    icon: "🔒",
    category: "legal",
    description: "Protect confidential business information (NDA)",
    seconds: 10,
  },
  {
    id: "employment-contract",
    name: "Employment Contract",
    icon: "💼",
    category: "legal",
    description: "Nigerian Labour Act compliant employment agreement",
    seconds: 15,
    nigerianContext: true,
  },
  {
    id: "tenancy-agreement",
    name: "Tenancy Agreement",
    icon: "🏠",
    category: "legal",
    description: "Residential or commercial property rental agreement",
    seconds: 12,
    nigerianContext: true,
  },
  {
    id: "sales-contract",
    name: "Sales Contract",
    icon: "🛒",
    category: "legal",
    description: "Agreement for sale of goods or services",
    seconds: 10,
  },
  {
    id: "appointment-letter",
    name: "Appointment Letter",
    icon: "📨",
    category: "hr",
    description: "Formal job offer and appointment confirmation",
    seconds: 8,
    nigerianContext: true,
  },
  {
    id: "offer-letter",
    name: "Offer Letter",
    icon: "📩",
    category: "hr",
    description: "Initial job offer with terms and conditions",
    seconds: 8,
  },
  {
    id: "query-letter",
    name: "Query Letter",
    icon: "⚠️",
    category: "hr",
    description: "Formal query to employee about misconduct or performance",
    seconds: 6,
  },
  {
    id: "warning-letter",
    name: "Warning Letter",
    icon: "🟡",
    category: "hr",
    description: "Official warning letter to employee (first/final)",
    seconds: 6,
  },
  {
    id: "termination-letter",
    name: "Termination Letter",
    icon: "🔴",
    category: "hr",
    description: "Employment termination in line with Nigerian Labour Act",
    seconds: 8,
    nigerianContext: true,
  },
  {
    id: "commercial-invoice",
    name: "Commercial Invoice",
    icon: "🧾",
    category: "finance",
    description: "Professional invoice for goods or services rendered",
    seconds: 6,
  },
  {
    id: "proforma-invoice",
    name: "Proforma Invoice / Quotation",
    icon: "📑",
    category: "finance",
    description: "Price quote before actual sale is completed",
    seconds: 6,
  },
  {
    id: "purchase-order",
    name: "Purchase Order",
    icon: "📦",
    category: "finance",
    description: "Formal order document sent to suppliers",
    seconds: 8,
  },
  {
    id: "delivery-note",
    name: "Delivery Note",
    icon: "🚚",
    category: "finance",
    description: "Confirmation of goods delivered to customer",
    seconds: 5,
  },
];

export const getDocumentType = (id: string) =>
  DOCUMENT_TYPES.find((d) => d.id === id);

export const formatNaira = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;
