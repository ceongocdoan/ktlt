const { StudentManager } = require('./studentManager');

(async () => {
    const manager = new StudentManager();
    const filePath = './students.json'; // Đường dẫn file JSON chứa dữ liệu

    await manager.loadData(filePath); // Tải dữ liệu

    // Thực hiện các lệnh
    console.log('\nDanh sách sinh viên:');
    manager.list(); // Lệnh 1

    console.log('\nTìm sinh viên với MSSV 20230108:');
    manager.find('20230108'); // Lệnh 2

    console.log('\nCập nhật CPA cho sinh viên 20230108:');
    manager.modifyCPA('20230108', 3.8); // Lệnh 3

    console.log('\nTop 3 sinh viên có CPA cao nhất:');
    manager.findTop(3); // Lệnh 4

    console.log('\nBottom 3 sinh viên có CPA thấp nhất:');
    manager.findBottom(3); // Lệnh 5

    console.log('\nDanh sách sinh viên bị cảnh cáo:');
    manager.findCanhCao(); // Lệnh 6

    console.log('\nSố sinh viên có CPA trong khoảng [2.0, 3.5]:');
    manager.countInRange(2.0, 3.5); // Lệnh 7

    console.log('\nSố lượng sinh viên bị đình chỉ học:');
    manager.countDinhChi(2024); // Lệnh 8

    await manager.saveData(filePath); // Lưu dữ liệu sau khi cập nhật
})();
