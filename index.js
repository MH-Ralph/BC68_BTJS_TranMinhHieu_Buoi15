const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const DOI_TUONG_1 = "1";
const DOI_TUONG_2 = "2";
const DOI_TUONG_3 = "3";

const KHU_VUC_A = "A";
const KHU_VUC_B = "B";
const KHU_VUC_C = "C";

const NHA_DAN = "Nhà dân";
const DOANH_NGHIEP = "Doanh nghiệp";

// Initialize
let nameButton = [
  "Kết quả",
  "Tính tiền điện",
  "Tính tiền thuế",
  "Tính tiền cáp",
];

// DOM elements
const tabs = $$(".tab-item");
const panes = $$(".pane-item");
const line = $(".tab-line");
const submitBtn1 = $(".sumbit1");
const submitBtn2 = $(".sumbit2");
const submitBtn3 = $(".sumbit3");
const submitBtn4 = $(".sumbit4");
const result1 = $(".tab-result-1");
const result2 = $(".tab-result-2");
const result3 = $(".tab-result-3");
const result4 = $(".tab-result-4");

function start() {
  //Xử lí Tabs khi click
  handleTab();
  //Xử lí Input
  handleResult();
}

start();

function handleTab() {
  tabs.forEach((tab, index) => {
    //Lấy ra pane tương ứng với tab
    let pane = panes[index];

    //Khi click vào tab
    tab.onclick = function () {
      //Xóa class active cũ và thêm active mới.
      $(".tab-item.active").classList.remove("active");
      $(".pane-item.active").classList.remove("active");
      this.classList.add("active");
      pane.classList.add("active");

      //Set line cho tab
      setLine(tab);
    };
  });
}

function setLine(tab) {
  line.setAttribute(
    "style",
    `left: ${tab.offsetLeft}px; 
        width: ${tab.offsetWidth}px;`
  );
}

function handleResult() {
  submitBtn1.onclick = function () {
    // DOM cho bt1
    let total;
    const diemChuan = $("#bench-mark").value;
    const khuVuc = $("#area").value;
    const doiTuong = $("#object").value;
    const diemMon1 = $("#score-1").value * 1;
    const diemMon2 = $("#score-2").value * 1;
    const diemMon3 = $("#score-3").value * 1;

    let diemKv = kiemTraKv(khuVuc);
    let diemDoiTuong = kiemTraDt(doiTuong);

    if (diemChuan <= 0) {
      alert("Vui lòng nhập điểm chuẩn");
      return;
    }

    // Tính điểm sinh viên
    if (diemMon1 && diemMon2 && diemMon3) {
      total = diemMon1 + diemMon2 + diemMon3 + diemKv + diemDoiTuong;
      if (total >= diemChuan * 1) {
        result1.innerText = `Bạn đã đậu. Tổng điểm: ${total}`;
        console.log(total);
      } else {
        result1.innerText = `Bạn đã rớt. Tổng điểm: ${total}`;
      }
    } else {
      result1.innerText = "Bạn đã rớt. Do có điểm nhỏ hơn hoặc bằng 0";
    }
  };

  submitBtn2.onclick = function () {
    // DOM cho bt2
    const tenChuho = $("#full-name-el").value;
    const soDien = $("#electric-bill").value * 1;
    let bacThang = [50, 50, 100, 150, Infinity];
    let gia = [500, 650, 850, 1100, 1300];
    let tienDien = 0;
    let remaining = soDien;

    if (soDien > 0) {
      for (let i = 0; i < bacThang.length; i++) {
        if (remaining > bacThang[i]) {
          tienDien += bacThang[i] * gia[i];
          remaining -= bacThang[i];
        } else {
          tienDien += remaining * gia[i];
          break;
        }
      }
      result2.innerText =
        `Họ tên: ${tenChuho}; Tiền Điện: ${tienDien.toLocaleString("vi-VN")}` +
        " VND";
    } else {
      alert("Số điện không hợp lệ");
    }
  };

  submitBtn3.onclick = function () {
    // DOM cho bt3
    const hoTen = $("#full-name").value;
    const luong = $("#salary").value * 1;
    const soNguoi = $("#number-dependent").value * 1;
    let laiSuat = tinhLaiSuat(luong);
    let thue;

    if (luong >= 12000000 && soNguoi) {
      thue = (luong - 4000000 - soNguoi * 1600000) * laiSuat;
      result3.innerText = `Họ tên: ${hoTen}; Tiền thuế thu nhập cá nhân: ${thue.toLocaleString(
        "vi-VN"
      )} VND`;
    } else if (soNguoi === 0) {
      alert("Số người không hợp lệ");
    } else {
      alert("Số tiền thu nhập không hợp lệ");
    }
  };

  //   Hiện input số kênh
  $("#client").onchange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "Doanh nghiệp") {
      $("#connect-number").style.display = "block";
    } else {
      $("#connect-number").style.display = "none";
    }
  };

  submitBtn4.onclick = function () {
    const khachHang = $("#client").value;
    const maKH = $("#customer-code").value;
    const soKenh = $("#channel-number").value * 1;
    const soKetNoi = $("#connect-number").value * 1;

    let phiXuLi = kiemTraPhiXLi(khachHang);
    let phiDvu = kiemTraPhiDvu(khachHang);
    let phiKenh = kiemTraPhiKenh(khachHang);
    let phiKetNoi = kiemTraPhiKetNoi(soKetNoi);
    let total;

    if (khachHang == NHA_DAN) {
      total = phiXuLi + phiDvu + phiKenh * soKenh;
    } else if (khachHang == DOANH_NGHIEP) {
      total = phiXuLi + phiDvu + phiKenh * soKenh + phiKetNoi;
    } else {
      alert("Vui lòng chọn loại khách hàng");
      return;
    }

    result4.innerText = `Mã khách hàng: ${maKH}; Tiền cáp: $${total}`;
  };
}

function kiemTraPhiXLi(khachHang) {
  switch (khachHang) {
    case NHA_DAN:
      return 4.5;
    case DOANH_NGHIEP:
      return 15;
    default:
      return 0;
  }
}
function kiemTraPhiDvu(khachHang) {
  switch (khachHang) {
    case NHA_DAN:
      return 20.5;
    case DOANH_NGHIEP:
      return 75;
    default:
      return 0;
  }
}
function kiemTraPhiKenh(khachHang) {
  switch (khachHang) {
    case NHA_DAN:
      return 7.5;
    case DOANH_NGHIEP:
      return 50;
    default:
      return 0;
  }
}

function kiemTraPhiKetNoi(soKetNoi) {
  if (soKetNoi > 10) {
    return (soKetNoi - 10) * 5;
  } else {
    return 0;
  }
}

function tinhLaiSuat(luong) {
  if (luong <= 60000000 && luong > 0) {
    return 0.05;
  } else if (luong > 60000000 && luong <= 120000000) {
    return 0.1;
  } else if (luong > 120000000 && luong <= 210000000) {
    return 0.15;
  } else if (luong > 210000000 && luong <= 384000000) {
    return 0.2;
  } else if (luong > 384000000 && luong <= 624000000) {
    return 0.25;
  } else if (luong > 624000000 && luong <= 960000000) {
    return 0.3;
  } else if (luong > 960000000) {
    return 0.35;
  } else {
    return 0;
  }
}

function kiemTraKv(khuVuc) {
  switch (khuVuc) {
    case KHU_VUC_A:
      return 2;
    case KHU_VUC_B:
      return 1;
    case KHU_VUC_C:
      return 0.5;
    default:
      return 0;
  }
}

function kiemTraDt(doiTuong) {
  switch (doiTuong) {
    case DOI_TUONG_1:
      return 2.5;
    case DOI_TUONG_2:
      return 1.5;
    case DOI_TUONG_3:
      return 1;
    default:
      return 0;
  }
}
