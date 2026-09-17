# Employee Management Dashboard

A responsive, single-page web application designed for real-time employee data tracking, filtering, and administration. Built using vanilla HTML5, CSS3, and JavaScript, this project demonstrates core front-end software development concepts, dynamic DOM manipulation, and REST API integration.

---

### Key Features

* **Live Dashboard Metrics:** Dynamically calculates total employees, total payroll, average salary, and identifies the highest-paid employee using array methods.
* **Real-Time Data Integration:** Fetches initial mock data from an external REST API (`DummyJSON`), maps payload objects, and handles asynchronous state.
* **Search & Department Filtering:** Instant client-side search by employee name combined with single-click department category filtering.
* **Multi-Attribute Sorting:** Sorts listed records dynamically by name, age, or salary in ascending/descending order.
* **Employee Onboarding Form:** Complete form with custom front-end validation rules for required fields, age restrictions ($>18$), and automatic image fallback handling.
* **Real-Time Clock:** Live updating header clock powered by native JavaScript date intervals.

---

### Tech Stack

* **Front-End:** HTML5, CSS3 (Flexbox & CSS Grid)
* **Scripting:** JavaScript (ES6+)
* **Data Fetching:** Fetch API, Async Promises
* **Icons & Images:** DummyJSON User API, Placeholder Fallbacks

---

### Project Structure

```text
├── index.html       # DOM structure and layout markup
├── style.css        # Responsive styling and design system
└── script.js        # Business logic, state management, and API calls

```

---

### Core Concepts Implemented

* **DOM Manipulation:** Programmatically creating, appending, and updating element nodes without external libraries.
* **Array Functional Methods:** Utilizing `.map()`, `.filter()`, `.reduce()`, and `.sort()` for efficient client-side data operations.
* **Asynchronous JS:** Handling API responses using `fetch()`, Promises, `.then()`, `.catch()`, and `.finally()`.
* **Event Handling:** Form submissions, input change listeners, dynamically bound inline event listeners, and default browser action overrides.
* **Responsive Layouts:** Mobile-first design patterns utilizing CSS Grid and media query breakpoints.

---

### Getting Started

1. Clone or download the repository to your local directory.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, or Safari).
3. Ensure an active internet connection to load initial employee data from the REST endpoint and remote avatar images.

---

### Developer Profile

* **Developer:** Ritheeck Dharan M
* **Role:** Java Full Stack Developer
* **Organization:** Stackly
