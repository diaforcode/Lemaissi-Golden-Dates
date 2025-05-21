type Field = {
  label: string;
  placeholder: string;
  validation?: {
    required: string;
    invalid?: string;
  };
};

export type Translations = {
  logo: string;
  home: {
    sliderComponent: {
      title: string;
      description: string;
      description2: string;
      Meetus: string;
    };
    bestProducts: {
      Discover: string;
      OurProducts: string;
    };
    about: {
      ourStory: string;
      aboutUs: string;
      descriptions: {
        one: string;
        two: string;
        three: string;
      };
    };
    contact: {
      DontHesitate: string;
      contactUs: string;
    };
  };
  products: {
    productInfo: string;
    ChooseQuantity: string;
    addToCart: string;
    noProductsFound: string;
  };
  navbar: {
    home: string;
    about: string;
    ourProducts: string;
    menu: string;
    contact: string;
    myAccount: string;
    login: string;
    register: string;
    signOut: string;
    profile: string;
    admin: string;
    search: string;
  };
  auth: {
    login: {
      title: string;
      name: Field;
      email: Field;
      password: Field;
      submit: string;
      authPrompt: {
        message: string;
        signUpLinkText: string;
      };
    };
    register: {
      title: string;
      name: Field;
      email: Field;
      password: Field;
      confirmPassword: Field;
      submit: string;
      authPrompt: {
        message: string;
        loginLinkText: string;
      };
    };
  };
  validation: {
    nameRequired: string;
    validEmail: string;
    passwordMinLength: string;
    passwordMaxLength: string;
    confirmPasswordRequired: string;
    passwordMismatch: string;
  };
  menuItem: {
    addToCart: string;
  };
  messages: {
    userNotFound: string;
    incorrectPassword: string;
    loginSuccessful: string;
    unexpectedError: string;
    userAlreadyExists: string;
    accountCreated: string;
    updateProfileSucess: string;
    categoryAdded: string;
    updatecategorySucess: string;
    deleteCategorySucess: string;
    productAdded: string;
    updateProductSucess: string;
    deleteProductSucess: string;
    updateUserSucess: string;
    deleteUserSucess: string;
  };
  cart: {
    title: string;
    noItemsInCart: string;
  };
  profile: {
    title: string;
    form: {
      name: Field;
      email: Field;
      phone: Field;
      address: Field;
      postalCode: Field;
      city: Field;
      country: Field;
    };
  };
  admin: {
    tabs: {
      profile: string;
      categories: string;
      menuItems: string;
      users: string;
      orders: string;
      images: string;
    };
    categories: {
      createNewCategory: string;
      form: {
        name: {
          label: string;
          placeholder: string;
          validation: {
            required: string;
          };
        };
        nameArabic: {
          label: string;
          placeholder: string;
          validation: {
            required: string;
          };
        };
        description: {
          label: string;
          placeholder: string;
          validation: {
            required: string;
          };
        };
        descriptionArabic: {
          label: string;
          placeholder: string;
          validation: {
            required: string;
          };
        };
        image: {
          validation: {
            required: string;
          };
        };
      };
    };
    "menu-items": {
      addItemSize: string;
      createNewMenuItem: string;
      addExtraItem: string;
      menuOption: {
        name: string;
        extraPrice: string;
      };
      form: {
        name: {
          label: string;
          placeholder: string;
          validation: {
            required: string;
          };
        };
        nameArabic: {
          label: string;
          placeholder: string;
          validation: {
            required: string;
          };
        };
        description: {
          label: string;
          placeholder: string;
          validation: {
            required: string;
          };
        };
        descriptionArabic: {
          label: string;
          placeholder: string;
          validation: {
            required: string;
          };
        };
        price: {
          label: string;
          placeholder: string;
          validation: {
            required: string;
          };
        };
        category: {
          validation: {
            required: string;
          };
        };
        image: {
          validation: {
            required: string;
          };
        };
      };
    };
  };
  footer: {
    title: string;
    description: string;
    about: string;

    contact: string;
    followUs: string;
    subscribe: {
      title: string;
      emailSubscribe: string;
      successMessage: string;
      errorMessage: string;
    };
  };

  sizes: string;
  extrasIngredients: string;
  delete: string;
  cancel: string;
  create: string;
  save: string;
  category: string;
  copyRight: string;
  noProductsFound: string;
};
