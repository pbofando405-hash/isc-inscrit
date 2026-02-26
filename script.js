document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("studentForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let students = JSON.parse(localStorage.getItem("students")) || [];
            let editIndex = document.getElementById("editIndex").value;

            let student = {
                matricule: generateMatricule(),
                nom: nom.value,
                postnom: postnom.value,
                prenom: prenom.value,
                sexe: sexe.value,
                filiere: filiere.value,
                departement: departement.value,
                telephone: telephone.value,
                email: email.value
            };

            if (editIndex === "") {
                students.push(student);
            } else {
                student.matricule = students[editIndex].matricule;
                students[editIndex] = student;
            }

            localStorage.setItem("students", JSON.stringify(students));
            window.location.href = "etudiants.html";
        });
    }

    if (document.getElementById("studentList")) {
        displayStudents();
    }
});

// 🎓 Générer matricule automatique
function generateMatricule() {
    let year = new Date().getFullYear();
    let random = Math.floor(1000 + Math.random() * 9000);
    return "ISC-" + year + "-" + random;
}

// 📊 Afficher étudiants
function displayStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let list = document.getElementById("studentList");
    list.innerHTML = "";

    document.getElementById("totalStudents").innerText = students.length;

    students.forEach((s, index) => {
        list.innerHTML += `
        <tr>
            <td>${s.matricule}</td>
            <td>${s.nom}</td>
            <td>${s.postnom}</td>
            <td>${s.prenom}</td>
            <td>${s.sexe}</td>
            <td>${s.filiere}</td>
            <td>${s.departement}</td>
            <td>${s.telephone}</td>
            <td>${s.email}</td>
            <td>
                <button onclick="editStudent(${index})">Modifier</button>
                <button onclick="deleteStudent(${index})">Supprimer</button>
            </td>
        </tr>
        `;
    });
}

// 🔍 Recherche
function searchStudent() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("#studentList tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}

// ❌ Supprimer
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

// ✏ Modifier
function editStudent(index) {
    localStorage.setItem("editStudent", index);
    window.location.href = "inscription.html";
}
