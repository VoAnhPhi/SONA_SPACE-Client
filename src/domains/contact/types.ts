// Form related interfaces
export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  agreeToTerms: boolean;
}

export interface ArchitectFormData extends ContactFormData {
  experience?: Experience[];
  skills?: Skill[];
  education?: Education[];
  portfolio?: string;
}

export interface ContactFormDesign {
  name: string;
  email: string;
  phone: string;
  room_name: string;
  custom_room_name?: string;
  design_description: string;
  require_design: string;
  style_design: string;
  budget: string;
  different_information: string;
  agreeToTerms?: boolean;
}

export interface Experience {
  position: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  university: string;
  degree: string;
  location: string;
}

export interface Recommendation {
  text: string;
  author: string;
  position?: string;
}

export interface ContactForm {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  agreeToTerms: boolean;
}
