export const createUserSchema = {
  username: {
    isString: true,
    isString: {
      errorMessage: "username must to be a string",
    },
    notEmpty: {
      errorMessage: "username must not be empty",
    },
    isLength: {
      options: {
        min: 5,
        max: 30,
      },
      errorMessage:
        "username must to be at least 5 character and less than 30 ",
    },
  },
  email: {
    isString: true,
    isString: {
      errorMessage: "email must to be a string",
    },
    isEmail: {
      errorMessage: "email must to be a valid email",
    },
    notEmpty: {
      errorMessage: "email must not be empty",
    },
    isLength: {
      options: {
        min: 5,
        max: 30,
      },
      errorMessage: "email must to be at least 5 character and less than 30 ",
    },
  },
  password: {
    isString: true,
    isString: {
      errorMessage: "password must to be a string",
    },
    notEmpty: {
      errorMessage: "password must not be empty",
    },
    isLength: {
      options: {
        min: 6,
        max: 30,
      },
      errorMessage:
        "password must to be at least 5 character and less than 30 ",
    },
  },
};
export const createOrderSchema = {
  userId: {
    isString: true,
    isString: {
      errorMessage: "userId must to be string",
    },

    notEmpty: {
      errorMessage: "userId must not be empty",
    },
  },
  products: {
    isArray: true,
    isArray: {
      errorMessage: "products must to be an array",
    },
    notEmpty: {
      errorMessage: "products must not be empty",
    },
  },
  amount: {
    isNumeric: {
      errorMessage: "amount must to be a Number",
    },

    notEmpty: {
      errorMessage: "amount must not be empty",
    },
  },
  address: {
    isString: true,
    isString: {
      errorMessage: "address must to be a string",
    },
    notEmpty: {
      errorMessage: "address must not be empty",
    },
    isLength: {
      options: {
        min: 5,
        max: 30,
      },
      errorMessage: "address must to be at least 5 character and less than 30 ",
    },
  },
  status: {
    isString: true,
    isString: {
      errorMessage: "status must to be string",
    },
  },
};
