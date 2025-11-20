class RegisterScreenLocator {
  get lblDieuKienDieuKhoanSuDung() {
    const selector = `new UiSelector().description(" Điều kiện & điều khoản sử dụng ")`;
    return $(`android=${selector}`);
  }

  get rdToiDongYDieuKienVaDieuKhoan() {
    const selector = `new UiSelector().description("Tôi đồng ý với Điều kiện & điều khoản các dịch vụ của Công ty Cổ phần Kinh doanh F88 thông qua ứng dụng My F88")`;
    return $(`android=${selector}`);
  }

  get btnHuyBo() {
    const selector = `new UiSelector().description("Hủy bỏ")`;
    return $(`android=${selector}`);
  }

  get btnTiepTuc() {
    const selector = `new UiSelector().description("Tiếp tục")`;
    return $(`android=${selector}`);
  }

  get lblNhapSoDienThoaiDangKy() {
    const selector = `new UiSelector().description("Nhập số điện thoại đăng ký")`;
    return $(`android=${selector}`);
  }

  get btnEnter() {
    return $(
      `//android.widget.Button[@content-desc="0"]/following-sibling::android.widget.ImageView`
    );
  }

  get lblNhapSoCccdCmnd() {
    const selector = `new UiSelector().description("Nhập số CCCD/CMND")`;
    return $(`android=${selector}`);
  }

  get msgThongBaoLoi() {
    return $(
      `(//android.widget.ImageView/following-sibling::android.view.View)[1]`
    );
  }

  get btnOK() {
    const selector = `new UiSelector().description("OK")`;
    return $(`android=${selector}`);
  }
}
module.exports = new RegisterScreenLocator();
