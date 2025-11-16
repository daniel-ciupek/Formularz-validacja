class FormValidator {
  constructor() {
    this.formFields = [];

    this.form = document.getElementById("form");
   /* this.addFormField("#username", {
        minlength: 4, maxlength: 20
    });
      this.addFormField("#email", {
        minlength: 4, maxlength: 100
    });
      this.addFormField("#password", {
        minlength: 5, maxlength: 30
    });
      this.addFormField("#password2", {
        minlength: 5, maxlength: 30, matchWithPasswordId: "#password"
    }); */
this.processForm();

    console.log(this.formFields);


    this.init();
  }
 processForm = () => {
    this.form.querySelectorAll("input").forEach(e => {

        let minlengthAttr = e.getAttribute("minlength");
        let minlength = minlengthAttr !== null ? parseInt(minlengthAttr) : undefined;

        let maxlengthAttr = e.getAttribute("maxlength");
        let maxlength = maxlengthAttr !== null ? parseInt(maxlengthAttr) : undefined;

        let matchWithPasswordId = e.getAttribute("data-match-witch-password-id") || undefined;

        this.addFormField(`#${e.id}`, {
            minlength,
            maxlength,
            matchWithPasswordId
        });
    });
  }

  addFormField = (cssSelector, options) => {
const formField = new FormField(cssSelector, options );
this.formFields.push(formField);

  }
  init() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      this.validateForm();
    });
  }

  validateForm = () => {
    const formResults = this.formFields.map((f) => f.validate());

    if (formResults.includes(false)) {
      console.log("Błąd w formularzu");
    } else {
      console.log("Formularz jest OK");
    }
  };
}
