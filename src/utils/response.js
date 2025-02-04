class Response {
  constructor(data = null, message = null, status) {
    (this.data = data), (this.message = message);
    this.status = status;
  }

  success(res) {
    return res.status(200).json({
      success: true,
      data: this.data,
      message: this.message ?? "Transaction successful",
    });
  }

  created(res) {
    return res.status(201).json({
      success: true,
      data: this.data,
      message: this.message ?? "Transaction successful",
    });
  }

  error500(res) {
    return res.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "Operation failed!",
    });
  }

  error400(res) {
    return res.status(400).json({
      success: false,
      data: this.data,
      message: this.message ?? "Operation failed!",
    });
  }

  error401(res) {
    return res.status(401).json({
      success: false,
      data: this.data,
      message: this.message ?? "Please sign in!",
    });
  }
  error404(res) {
    return res.status(404).json({
      success: false,
      data: this.data,
      message: this.message ?? "Operation failed!",
    });
  }

  error429(res) {
    return res.status(429).json({
      success: false,
      data: this.data,
      message: this.message ?? "too many request!",
    });
  }
}

module.exports = Response;
