export type NavItem = {
  label: string;
  href?: string;
  description?: string;
  highlight?: boolean;
  icon?: string;
  subMenu?: SubMenuSection[];
};

export type SubMenuLink = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
};

export type SubMenuSection = {
  title?: string;
  items: SubMenuLink[];
};

export type MegaMenuItem = {
  label: string;
  description?: string;
  href: string;
  icon?: string;
};

export type MegaMenuColumn = {
  title: string;
  subtitle?: string;
  items: MegaMenuItem[];
};

export type Announcement = {
  message: string;
  actionLabel: string;
  actionHref: string;
};

export type NavbarData = {
  announcement?: Announcement;
  nav: NavItem[];
  megaMenu: {
    triggerLabel: string;
    columns: MegaMenuColumn[];
  };
  ctaPrimary: string;
  ctaSecondary: string;
};
