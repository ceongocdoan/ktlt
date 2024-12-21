const fs = require("fs/promises");

class Student {
    constructor(mssv, hoTen, cpa, canhCao) {
        this.mssv = mssv;
        this.hoTen = hoTen;
        this.cpa = cpa;
        this.canhCao = canhCao;
    }

    updateCPA(newCPA) {
        this.cpa = parseFloat(newCPA);
        this.updateCanhCao();
    }

    updateCanhCao() {
        if (this.cpa <= 0.5) {
            this.canhCao = 3;
        } else if (this.cpa <= 1.0) {
            this.canhCao = 2;
        } else if (this.cpa <= 1.5) {
            this.canhCao = 1;
        } else {
            this.canhCao = 0;
        }
    }
}

class StudentManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.students = [];
    }

    // Hàm load dữ liệu từ file
    async loadData() {
        try {
            const data = await fs.readFile(this.filePath, "utf8");
            const jsonData = JSON.parse(data);
            this.students = jsonData.map(
                (s) => new Student(s.mssv, s.hoTen, s.cpa, s.canhCao)
            );
        } catch (error) {
            console.error("Lỗi khi đọc file:", error);
        }
    }

    // Hàm lưu dữ liệu vào file
    async saveData() {
        try {
            const jsonData = JSON.stringify(this.students, null, 2);
            await fs.writeFile(this.filePath, jsonData, "utf8");
            console.log("Dữ liệu đã được lưu lại.");
        } catch (error) {
            console.error("Lỗi khi ghi file:", error);
        }
    }

    // Hiển thị danh sách sinh viên
    listStudents() {
        console.log("Danh sách sinh viên:");
        this.students.forEach((s) => console.log(`${s.mssv} - ${s.hoTen}`));
    }

    // Tìm sinh viên theo MSSV
    findStudent(mssv) {
        const student = this.students.find((s) => s.mssv === mssv);
        if (student) {
            console.log(
                `Thông tin sinh viên: ${student.mssv} - ${student.hoTen} - CPA: ${student.cpa} - Cảnh cáo: ${student.canhCao}`
            );
        } else {
            console.log("Không tìm thấy sinh viên.");
        }
    }

    // Cập nhật CPA cho sinh viên
    updateCPA(mssv, newCPA) {
        const student = this.students.find((s) => s.mssv === mssv);
        if (student) {
            student.updateCPA(newCPA);
            console.log(`CPA của sinh viên ${mssv} đã được cập nhật thành ${newCPA}.`);
        } else {
            console.log("Không tìm thấy sinh viên để cập nhật.");
        }
    }

    // Tìm n sinh viên có CPA cao nhất
    findTopStudents(n) {
        const sorted = [...this.students].sort((a, b) => b.cpa - a.cpa).slice(0, n);
        console.log(`Top ${n} sinh viên có CPA cao nhất:`);
        sorted.forEach((s) => console.log(`${s.mssv} - ${s.hoTen} - CPA: ${s.cpa}`));
    }

    // Tìm n sinh viên có CPA thấp nhất
    findBottomStudents(n) {
        const sorted = [...this.students].sort((a, b) => a.cpa - b.cpa).slice(0, n);
        console.log(`Bottom ${n} sinh viên có CPA thấp nhất:`);
        sorted.forEach((s) => console.log(`${s.mssv} - ${s.hoTen} - CPA: ${s.cpa}`));
    }

    // Tìm danh sách sinh viên bị cảnh cáo
    listCanhCao() {
        console.log("Danh sách sinh viên bị cảnh cáo:");
        this.students.forEach((s) => {
            s.updateCanhCao();
            if (s.canhCao > 0) {
                console.log(`${s.mssv} - ${s.hoTen} - CPA: ${s.cpa} - Cảnh cáo: ${s.canhCao}`);
            }
        });
    }
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const manager = new StudentManager("./students.json");

    await manager.loadData();

    switch (command) {
        case "list":
            manager.listStudents();
            break;
        case "find":
            manager.findStudent(args[1]);
            break;
        case "modify":
            manager.updateCPA(args[1], args[2]);
            break;
        case "findtop":
            manager.findTopStudents(parseInt(args[1]));
            break;
        case "findbottom":
            manager.findBottomStudents(parseInt(args[1]));
            break;
        case "canhcao":
            manager.listCanhCao();
            break;
        default:
            console.log("Lệnh không hợp lệ. Các lệnh hỗ trợ: list, find, modify, findtop, findbottom, canhcao.");
    }

    await manager.saveData();
}

main();
