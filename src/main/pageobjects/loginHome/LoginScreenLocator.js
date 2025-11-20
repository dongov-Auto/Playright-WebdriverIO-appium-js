class LoginScreen {
  get getUpdatedVersionPopup() {
    const selector = 'new UiSelector().description("Đã có phiên bản mới")';
    return $(`android=${selector}`);
  }

  get btnCapNhat() {
    const selector = 'new UiSelector().description("Cập nhật")';
    return $(`android=${selector}`);
  }

  get btnBoQua() {
    const selector = 'new UiSelector().description("Bỏ qua").instance(0)';
    return $(`android=${selector}`);
  }

  get btnDangKy() {
    const selector = 'new UiSelector().description("Đăng ký")';
    return $(`android=${selector}`);
  }

  get btnDangNhap() {
    const selector =
      'new UiSelector().description("Đã có tài khoản? Đăng nhập >")';
    return $(`android=${selector}`);
  }
}

module.exports = new LoginScreen();
