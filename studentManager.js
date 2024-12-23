const fs = require('fs/promises');

class Student {
    constructor(mssv, name, cpa, canhcao) {
        this.mssv = mssv; // Mã số sinh viên
        this.name = name; // Họ và tên
        this.cpa = cpa; // Điểm trung bình tích lũy (CPA)
        this.canhcao = canhcao; // Mức cảnh cáo (1, 2, 3)
    }
}

class StudentManager {
    constructor() {
        this.students = [];
    }

    // Load dữ liệu từ file JSON
    async loadData(filePath) {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            this.students = JSON.parse(data).map(
                (item) => new Student(item.mssv, item.name, item.cpa, item.canhcao)
            );
            console.log('Dữ liệu đã được tải thành công!');
        } catch (err) {
            console.error('Lỗi khi tải dữ liệu:', err.message);
        }
    }

    // Lưu dữ liệu vào file JSON
    async saveData(filePath) {
        try {
            await fs.writeFile(filePath, JSON.stringify(this.students, null, 2), 'utf8');
            console.log('Dữ liệu đã được lưu thành công!');
        } catch (err) {
            console.error('Lỗi khi lưu dữ liệu:', err.message);
        }
    }

    // Lệnh 1: list
    list() {
        this.students.forEach((student) => {
            console.log(`${student.mssv} - ${student.name}`);
        });
    }

    // Lệnh 2: find <mssv>
    find(mssv) {
        const student = this.students.find((s) => s.mssv === mssv);
        if (student) {
            console.log(`${student.mssv} "${student.name}" ${student.cpa} ${student.canhcao}`);
        } else {
            console.log('Không tìm thấy sinh viên.');
        }
        return student;
    }

    // Lệnh 3: modify cpa <mssv> <cpa_moi>
    modifyCPA(mssv, newCPA) {
        const student = this.find(mssv);
        if (student) {
            student.cpa = newCPA;
            console.log(`CPA của sinh viên ${mssv} đã được cập nhật thành ${newCPA}.`);
        }
    }

    // Lệnh 4: findtop n
    findTop(n) {
        const sorted = [...this.students].sort((a, b) => b.cpa - a.cpa).slice(0, n);
        sorted.forEach((student) => console.log(student.mssv));
    }

    // Lệnh 5: findbottom n
    findBottom(n) {
        const sorted = [...this.students].sort((a, b) => a.cpa - b.cpa).slice(0, n);
        sorted.forEach((student) => console.log(student.mssv));
    }

    // Lệnh 6: find canhcao
    findCanhCao() {
        const result = this.students.filter((s) => {
            if (s.cpa <= 0.5) s.canhcao = 3;
            else if (s.cpa <= 1.0) s.canhcao = 2;
            else if (s.cpa <= 1.5) s.canhcao = 1;
            else s.canhcao = 0; // Không cảnh cáo
            return s.canhcao > 0;
        });
        result.forEach((s) => console.log(`${s.mssv} ${s.name} mức cảnh cáo ${s.canhcao}`));
    }

    // Lệnh 7: cnt a b
    countInRange(a, b) {
        const count = this.students.filter((s) => s.cpa >= a && s.cpa <= b).length;
        console.log(`Số sinh viên có CPA trong khoảng [${a}, ${b}] là: ${count}`);
        return count;
    }

    // Lệnh 7: cnt 2.4 3.0
    countInRange2_4_3_0() {
        const count = this.students.filter((s) => s.cpa >= 2.4 && s.cpa <= 3.0).length;
        console.log(`Số sinh viên có CPA trong khoảng [2.4, 3.0] là: ${count}`);
        return count;
    }

    // Lệnh 8: đếm số sinh viên Đình chỉ
    countDinhChi(currentYear) {
        const count = this.students.filter((s) => {
            const mssvStr = s.mssv.toString();
            
            if (mssvStr.length < 4) return false;
            const startYear = parseInt(mssvStr.substring(0, 4)); 
            const studyYears = currentYear - startYear; 

            return studyYears > 5 && s.cpa <= 0.5; 
        }).length;

        console.log(`Tổng số sinh viên bị đình chỉ học là: ${count}`);
        return count;
    }
}

module.exports = { StudentManager, Student };