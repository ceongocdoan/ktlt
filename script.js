const studentForm = document.getElementById('student-form');
const studentTable = document.getElementById('student-table');

let students = []; // Danh sách sinh viên

// Hàm tải dữ liệu từ file JSON hoặc LocalStorage
const loadStudentsFromStorage = () => {
  const storedStudents = localStorage.getItem('students');
  
  if (storedStudents) {
    students = JSON.parse(storedStudents);
    renderStudents(); // Hiển thị danh sách sinh viên
  } else {
    loadStudentsFromFile();
  }
};

// Hàm tải dữ liệu từ file JSON
const loadStudentsFromFile = async () => {
  try {
    const response = await fetch('./students.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    students = await response.json();
    saveStudentsToStorage(); // Lưu dữ liệu vào localStorage để tránh tải lại sau này
    renderStudents();
  } catch (error) {
    console.error('Error loading students from file:', error);
  }
};

// Hàm tính mức cảnh cáo dựa trên CPA
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

// Hàm lưu dữ liệu vào LocalStorage
const saveStudentsToStorage = () => {
  localStorage.setItem('students', JSON.stringify(students));
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
  saveStudentsToStorage(); // Lưu lại vào LocalStorage
  studentForm.reset();
};

// Hàm xóa sinh viên
const deleteStudent = (index) => {
  students.splice(index, 1); // Xóa sinh viên khỏi mảng
  renderStudents();
  saveStudentsToStorage(); // Lưu lại vào LocalStorage
};

// Hàm sửa sinh viên
const editStudent = (index) => {
  const student = students[index];

  // Điền thông tin của sinh viên vào form
  document.getElementById('mssv').value = student.mssv;
  document.getElementById('hoTen').value = student.hoTen;
  document.getElementById('cpa').value = student.cpa;

  // Xóa sinh viên cũ để cập nhật
  deleteStudent(index);
};

// Lắng nghe sự kiện form submit
studentForm.addEventListener('submit', addStudent);

// Tải danh sách sinh viên khi trang được load
loadStudentsFromStorage();
