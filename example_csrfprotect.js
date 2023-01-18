//Here's an example of how you can generate and use CSRF tokens in a client-side JavaScript application:




//On the server side, generate a unique token for each user session and send it to the client in a cookie.
//Copy code


const csrfToken = generateCsrfToken();
res.cookie('XSRF-TOKEN', csrfToken);


//On the client side, read the token from the cookie and add it to a hidden field in your form.
//opy code


const token = document.cookie.match(/XSRF-TOKEN=([\w-]+)/)[1];
const csrfField = document.createElement("input");
csrfField.setAttribute("type", "hidden");
csrfField.setAttribute("name", "_csrf");
csrfField.setAttribute("value", token);
form.appendChild(csrfField);


//When the form is submitted, include the token in the request headers.
//Copy code

fetch('/submit', {
  method: 'POST',
  headers: {
    'X-XSRF-TOKEN': token
  },
  body: new FormData(form)
});


//On the server side, validate the token by comparing it to the one stored in the user's session.
//Copy code


const tokenFromClient = req.headers['x-xsrf-token'];
const tokenFromServer = req.cookies.XSRF-TOKEN;
if (tokenFromClient !== tokenFromServer) {
    // handle error, for example return 403 status
} else {
    // proceed with the request
}

//Please keep in mind that this is a basic example and in a real-world application,
// you should consider additional security measures such as encryption and protecting against other types of attacks.
