
import throttle from "lodash.throttle";

const refs = {
    form: document.querySelector(".feedback-form"),
    email: document.querySelector('input[type="email"]'),
    text: document.querySelector('textarea[name="message"]'),
};
const STORAGE_KEY = "feedback-form-state";

populateForm();

function onInputForm(e) {
    const formData = { email: `${refs.form['email'].value}`, message: `${refs.form['message'].value}`, };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function onSubmitForm(e) {
    e.preventDefault();
    const {email, message} = e.currentTarget.elements;

    const data = {
        email: email.value,
        message: message.value,
    };
    if (email.value.length === 0 || message.value.length === 0){
        alert('Усі поля форми мають бути заповнені')
    }else{
        console.log(data);
        e.currentTarget.reset();
        localStorage.removeItem(STORAGE_KEY);
    }
    
};

function populateForm() {
    const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsedData) {
        refs.email.value = parsedData.email;
        refs.text.value = parsedData.message;
    };
};

refs.form.addEventListener('input', throttle(onInputForm , 500));

refs.form.addEventListener('submit', onSubmitForm);