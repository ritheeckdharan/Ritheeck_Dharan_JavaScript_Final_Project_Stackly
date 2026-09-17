let allEmployees = [];
let displayedEmployees = [];
let currentDepartment = 'All';
const defaultAvatar = "https://via.placeholder.com/80/2563eb/ffffff?text=User";

function updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    
    document.getElementById('dateTime').innerText = `Today: ${dateStr} | Time: ${timeStr}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

function fetchEmployees() {
    const statusBox = document.getElementById('statusMessage');
    statusBox.innerText = "Loading employees...";
    statusBox.style.display = "block";

    setTimeout(() => {
        fetch('https://dummyjson.com/users')
            .then((response) => response.json())
            .then((data) => {
                const departments = ['IT', 'HR', 'Finance', 'Marketing'];

                allEmployees = data.users.map((user, index) => {
                    const { id, firstName, lastName, age, email, phone, image } = user;
                    return {
                        id: id,
                        name: `${firstName} ${lastName}`,
                        age: age,
                        email: email,
                        phone: phone || "N/A",
                        department: departments[index % departments.length],
                        salary: (index + 1) * 12000 + 35000,
                        image: image
                    };
                });

                displayedEmployees = [...allEmployees];
                statusBox.innerText = "Employee data loaded successfully.";
                
                setTimeout(() => { statusBox.style.display = "none"; }, 3000);
            })
            .catch((error) => {
                console.error("API Fetch Error:", error);
                statusBox.innerText = "Unable to load employee data. Please try again.";
            })
            .finally(() => {
                renderUI();
            });
    }, 1000);
}

function renderUI() {
    displayEmployees(displayedEmployees);
    updateEmployeeCount();
    calculateSalary();
}

function displayEmployees(employees) {
    const container = document.getElementById('cardContainer');
    container.innerHTML = '';

    if (employees.length === 0) {
        container.innerHTML = `<p style="width:100%; text-align:center; padding:20px; font-weight:bold;">No employee records found.</p>`;
        return;
    }

    employees.forEach((emp) => {
        const { id, name, age, email, phone, department, salary, image } = emp;

        const card = document.createElement('div');
        card.className = 'employee-card';
        card.setAttribute('data-id', id);

        card.innerHTML = `
            <img src="${image}" alt="${name}" onerror="this.src='${defaultAvatar}'">
            <h3>${name}</h3>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Dept:</strong> ${department}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Salary:</strong> ₹${Number(salary).toLocaleString('en-IN')}</p>
            <button class="delete-btn" onclick="deleteEmployee(${id})">Delete</button>
        `;

        container.appendChild(card);
    });
}

function searchEmployees() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    displayedEmployees = allEmployees.filter((emp) => {
        const matchesName = emp.name.toLowerCase().includes(searchTerm);
        const matchesDept = currentDepartment === 'All' || emp.department === currentDepartment;
        return matchesName && matchesDept;
    });

    renderUI();
}

document.getElementById('searchInput').addEventListener('input', searchEmployees);

function filterDepartment(dept) {
    currentDepartment = dept;

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn) => {
        btn.classList.toggle('active', btn.innerText.includes(dept) || (dept === 'All' && btn.innerText.includes('All')));
    });

    displayedEmployees = dept === 'All'
        ? [...allEmployees]
        : allEmployees.filter((emp) => emp.department === dept);

    renderUI();
}

function updateEmployeeCount() {
    document.getElementById('employeeCount').innerText = displayedEmployees.length;
}

function validateEmployee(name, age, email, department) {
    const errorBox = document.getElementById('errorBox');

    if (!name) {
        errorBox.innerText = "❌ Please enter employee name";
        errorBox.style.display = 'block';
        return false;
    }

    if (!age || Number(age) <= 18) {
        errorBox.innerText = "❌ Age must be greater than 18";
        errorBox.style.display = 'block';
        return false;
    }

    if (!email) {
        errorBox.innerText = "❌ Please enter email address";
        errorBox.style.display = 'block';
        return false;
    }

    if (!department) {
        errorBox.innerText = "❌ Please select a department";
        errorBox.style.display = 'block';
        return false;
    }

    errorBox.style.display = 'none';
    return true;
}

function addEmployee(event) {
    event.preventDefault();

    const name = document.getElementById('empName').value.trim();
    const age = document.getElementById('empAge').value;
    const email = document.getElementById('empEmail').value.trim();
    const phone = document.getElementById('empPhone').value.trim() || 'N/A';
    const department = document.getElementById('empDept').value;
    const salaryInput = document.getElementById('empSalary').value;
    const imageUrl = document.getElementById('empImage').value.trim();

    if (!validateEmployee(name, age, email, department)) {
        return;
    }

    const newEmployee = {
        id: Date.now(),
        name: name,
        age: Number(age),
        email: email,
        phone: phone,
        department: department,
        salary: salaryInput ? Number(salaryInput) : 50000,
        image: imageUrl || defaultAvatar
    };

    allEmployees = [newEmployee, ...allEmployees];
    filterDepartment(currentDepartment);
    clearForm();
}

function deleteEmployee(empId) {
    allEmployees = allEmployees.filter((emp) => emp.id !== empId);
    filterDepartment(currentDepartment);
}

function calculateSalary() {
    if (displayedEmployees.length === 0) {
        document.getElementById('totalSalary').innerText = "₹0";
        document.getElementById('avgSalary').innerText = "₹0";
        document.getElementById('highestPaid').innerText = "None";
        return;
    }

    const totalSalary = displayedEmployees.reduce((sum, emp) => sum + emp.salary, 0);

    const avgSalary = Math.round(totalSalary / displayedEmployees.length);

    const highestPaidEmp = displayedEmployees.reduce((max, emp) => (emp.salary > max.salary ? emp : max), displayedEmployees[0]);

    document.getElementById('totalSalary').innerText = `₹${totalSalary.toLocaleString('en-IN')}`;
    document.getElementById('avgSalary').innerText = `₹${avgSalary.toLocaleString('en-IN')}`;
    document.getElementById('highestPaid').innerText = `${highestPaidEmp.name} (₹${highestPaidEmp.salary.toLocaleString('en-IN')})`;
}

function sortEmployees(option) {
    if (!option) return;

    displayedEmployees.sort((a, b) => {
        if (option === 'name-asc') return a.name.localeCompare(b.name);
        if (option === 'name-desc') return b.name.localeCompare(a.name);
        if (option === 'age-asc') return a.age - b.age;
        if (option === 'age-desc') return b.age - a.age;
        if (option === 'salary-asc') return a.salary - b.salary;
        if (option === 'salary-desc') return b.salary - a.salary;
        return 0;
    });

    displayEmployees(displayedEmployees);
}

function clearForm() {
    document.getElementById('addEmployeeForm').reset();
    document.getElementById('errorBox').style.display = 'none';
}

fetchEmployees();