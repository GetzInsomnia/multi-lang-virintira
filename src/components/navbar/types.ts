export type NavItem = {
  label: string;
  href: string;
};

export type MegaMenuItem = {
  label: string;
  description?: string;
  href: string;
};

export type MegaMenuColumn = {
  title: string;
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
