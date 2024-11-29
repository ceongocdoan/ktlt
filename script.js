const studentForm = document.getElementById('student-form');
const studentTable = document.getElementById('student-table');

let students = []; // Danh sách sinh viên

// Hàm tính mức cảnh cáo
const calculateWarningLevel = (cpa) => {
  if (cpa <= 0.5) return 3;
  if (cpa <= 1.0) return 2;
  if (cpa <= 1.5) return 1;
  return 0;
};

// Hàm hiển thị danh sách sinh viên
const renderStudents = () => {
  studentTable.innerHTML = '';
  students.forEach((student, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${student.mssv}</td>
      <td>${student.hoTen}</td>
      <td>${student.cpa}</td>
      <td>${student.canhCao}</td>
      <td>
        <button class="action-btn edit" onclick="editStudent(${index})">Sửa</button>
        <button class="action-btn delete" onclick="deleteStudent(${index})">Xóa</button>
      </td>
    `;
    studentTable.appendChild(row);
  });
};

// Hàm thêm sinh viên
const addStudent = (event) => {
  event.preventDefault();

  const mssv = document.getElementById('mssv').value;
  const hoTen = document.getElementById('hoTen').value;
  const cpa = parseFloat(document.getElementById('cpa').value);

  const newStudent = {
    mssv,
    hoTen,
    cpa,
    canhCao: calculateWarningLevel(cpa),
  };

  students.push(newStudent);
  renderStudents();
  studentForm.reset();
};

// Hàm xóa sinh viên
const deleteStudent = (index) => {
  students.splice(index, 1);
  renderStudents();
};

// Hàm sửa sinh viên
const editStudent = (index) => {
  const student = students[index];

  document.getElementById('mssv').value = student.mssv;
  document.getElementById('hoTen').value = student.hoTen;
  document.getElementById('cpa').value = student.cpa;

  deleteStudent(index); // Xóa sinh viên cũ để cập nhật
};

studentForm.addEventListener('submit', addStudent);
