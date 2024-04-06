import NewLogo from "./extensions/logo.svg";

export default {
  config: {
    locales: ["de", "tr"],
    auth: {
      logo: NewLogo,
    },
    menu: {
      logo: NewLogo,
    },
    tutorials: false,
  },
  bootstrap(app: any) {
    console.log(app);
  },
};
