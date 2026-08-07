export interface NavDropdownItem {
  label: string;
  path: string;
}

export interface NavItem {
  label: string;
  path?: string;
  dropdownItems?: NavDropdownItem[];
}

export interface DirectoryMember {
  id: string;
  name: string;
  gotra: string;
  city: string;
  state: string;
  business: string;
  phone: string;
  photo?: string;
  address?: string;
  nativePlace?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'marwar' | 'pravas-pradesh';
  date: string;
  author: string;
  summary: string;
  image: string;
}
