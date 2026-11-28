
(() => {
  function initDecalService() {
    const anchor = document.getElementById("decals");
    const data = window.DECAL_DATA;

    if (!anchor || !data ||
        document.getElementById("decalServiceV36")) {
      return;
    }

    const escape = value => String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

    const money = value =>
      typeof value === "number" && value > 0
        ? value.toLocaleString("vi-VN") + "đ"
        : "Liên hệ";

    const root = document.createElement("section");

    root.id = "decalServiceV36";
    root.className = "wrap";

    const materials = data.materials.map(item => `
      <article class="dp36-card">
        <span class="dp36-tag">${escape(item.tag)}</span>
        <h3>${escape(item.name)}</h3>
        <p>${escape(item.description)}</p>
        <h4>Ưu điểm</h4>
        <p>${escape(item.advantages)}</p>
        <h4>Hạn chế</h4>
        <p>${escape(item.limitations)}</p>
        <h4>Phù hợp với</h4>
        <p>${escape(item.suitable)}</p>
      </article>
    `).join("");

    const prices = data.prices.map(item => `
      <tr>
        <td>${escape(item.bike)}</td>
        <td>${money(item.basic)}</td>
        <td>${money(item.premium)}</td>
        <td>${money(item.ppf)}</td>
      </tr>
    `).join("");

    const comparisonHead = data.comparison.headers
      .map(item => `<th scope="col">${escape(item)}</th>`)
      .join("");

    const comparisonRows = data.comparison.rows
      .map(row => `
        <tr>
          ${row.map(cell => `<td>${escape(cell)}</td>`).join("")}
        </tr>
      `).join("");

    const faq = data.faq.map(item => `
      <details class="dp36-faq">
        <summary>${escape(item.question)}</summary>
        <p>${escape(item.answer)}</p>
      </details>
    `).join("");

    root.innerHTML = `
      <section class="dp36-panel">
        <span class="dp36-tag">DECAL PHỐ / DỊCH VỤ</span>
        <h2>DÁN DECAL <em>XE MÁY</em></h2>
        <p>
          Bảo vệ sơn nguyên bản, hạn chế trầy xước nhẹ
          và thay đổi phong cách theo sở thích.
          Lựa chọn vật liệu phù hợp với tình trạng xe,
          nhu cầu sử dụng và ngân sách của bạn.
        </p>

        <nav class="dp36-jump" aria-label="Nội dung dán xe">
          <a href="#dp36-prices">Bảng giá</a>
          <a href="#dp36-materials">Các loại decal</a>
          <a href="#dp36-compare">So sánh chất lượng</a>
          <a href="#dp36-knowledge">Kiến thức</a>
          <a href="#dp36-process">Thi công</a>
          <a href="#dp36-faq">Hỏi đáp</a>
        </nav>

        <div class="dp36-links">
          <a href="tel:0985500095">GỌI TƯ VẤN</a>
          <a href="https://zalo.me/0985500095"
             target="_blank" rel="noopener noreferrer">
            NHẮN ZALO
          </a>
        </div>
      </section>

      <section class="dp36-panel" id="dp36-prices">
        <h2>BẢNG GIÁ <em>DÁN XE</em></h2>
        <div class="dp36-table-wrap" tabindex="0">
          <table class="dp36-table">
            <thead>
              <tr>
                <th>Dòng xe</th>
                <th>Phổ thông</th>
                <th>Cao cấp</th>
                <th>PPF TPU</th>
              </tr>
            </thead>
            <tbody>${prices}</tbody>
          </table>
        </div>
        <p class="dp36-note">
          Chi phí phụ thuộc đời xe, tình trạng sơn,
          loại vật liệu và phạm vi thi công.
          Vui lòng liên hệ để được báo giá chính xác.
        </p>
      </section>

      <section class="dp36-panel" id="dp36-materials">
        <h2>CÁC LOẠI <em>DECAL</em></h2>
        <div class="dp36-grid">${materials}</div>
      </section>

      <section class="dp36-panel" id="dp36-compare">
        <h2>SO SÁNH <em>CHẤT LƯỢNG</em></h2>
        <div class="dp36-table-wrap" tabindex="0">
          <table class="dp36-table">
            <thead><tr>${comparisonHead}</tr></thead>
            <tbody>${comparisonRows}</tbody>
          </table>
        </div>
        <p class="dp36-note">
          Bảng so sánh mang tính định hướng.
          Thông số thực tế phụ thuộc từng mã vật liệu.
          TPH không phải một tiêu chuẩn phân loại
          vật liệu thống nhất.
        </p>
      </section>

      <section class="dp36-panel" id="dp36-knowledge">
        <h2>KIẾN THỨC <em>VẬT LIỆU</em></h2>

        <h3>01. Cấu tạo màng decal</h3>
        <p>
          Màng dán thường gồm lớp vật liệu chính,
          lớp keo và lớp đế bảo vệ keo.
          Một số loại có thêm lớp phủ bề mặt
          để cải thiện độ bóng hoặc khả năng bảo vệ.
        </p>

        <h3>02. Độ dày và chất lượng</h3>
        <p>
          Độ dày được đo bằng micron.
          1 mm tương đương 1.000 micron.
          Màng dày không đồng nghĩa với chất lượng cao.
          Cần đánh giá cả độ đàn hồi, lớp keo
          và khả năng ôm các góc cong.
        </p>

        <h3>03. PVC cán và PVC đúc</h3>
        <p>
          PVC cán thường có chi phí thấp hơn,
          phù hợp các bề mặt ít cong.
          PVC đúc thường có độ ổn định kích thước
          và khả năng ôm bề mặt phức tạp tốt hơn.
        </p>

        <h3>04. Độ bóng bề mặt</h3>
        <p><strong>Gloss:</strong> Bề mặt bóng.</p>
        <p><strong>High Gloss:</strong> Hiệu ứng siêu bóng.</p>
        <p><strong>Satin:</strong> Bán bóng.</p>
        <p><strong>Matte:</strong> Bề mặt lì, ít phản chiếu.</p>
        <p><strong>Carbon:</strong> Hiệu ứng vân trang trí.</p>
        <p><strong>Chameleon:</strong> Hiệu ứng chuyển sắc.</p>

        <h3>05. Khả năng tự phục hồi</h3>
        <p>
          Một số loại PPF có lớp phủ tự phục hồi
          các vết xước nhỏ khi gặp nhiệt độ phù hợp.
          Tính năng này không khắc phục được
          vết cắt sâu hoặc màng bị thủng.
        </p>

        <h3>06. Tuổi thọ và bảo dưỡng</h3>
        <p>
          Độ bền phụ thuộc chất lượng màng,
          tia UV, nhiệt độ, độ ẩm, kỹ thuật dán
          và cách vệ sinh xe.
          Tránh xịt nước áp lực cao trực tiếp
          vào mép decal.
        </p>
      </section>

      <section class="dp36-panel" id="dp36-process">
        <h2>QUY TRÌNH <em>THI CÔNG</em></h2>
        <div class="dp36-grid">
          <article class="dp36-card">
            <span class="dp36-tag">BƯỚC 01</span>
            <h3>Kiểm tra xe</h3>
            <p>Đánh giá sơn, dàn áo và tem cũ.</p>
          </article>
          <article class="dp36-card">
            <span class="dp36-tag">BƯỚC 02</span>
            <h3>Tư vấn vật liệu</h3>
            <p>Chọn chất liệu theo nhu cầu và ngân sách.</p>
          </article>
          <article class="dp36-card">
            <span class="dp36-tag">BƯỚC 03</span>
            <h3>Vệ sinh bề mặt</h3>
            <p>Loại bỏ bụi bẩn và dầu mỡ.</p>
          </article>
          <article class="dp36-card">
            <span class="dp36-tag">BƯỚC 04</span>
            <h3>Thi công</h3>
            <p>Căn chỉnh màng, xử lý góc cong và mép dán.</p>
          </article>
          <article class="dp36-card">
            <span class="dp36-tag">BƯỚC 05</span>
            <h3>Kiểm tra</h3>
            <p>Kiểm tra bề mặt và độ bám dính.</p>
          </article>
          <article class="dp36-card">
            <span class="dp36-tag">BƯỚC 06</span>
            <h3>Bàn giao</h3>
            <p>Hướng dẫn sử dụng và bảo dưỡng.</p>
          </article>
        </div>
      </section>

      <section class="dp36-panel" id="dp36-faq">
        <h2>CÂU HỎI <em>THƯỜNG GẶP</em></h2>
        ${faq}
      </section>

      <section class="dp36-panel">
        <h2>TƯ VẤN <em>DÁN XE</em></h2>
        <p>
          Liên hệ DECAL PHỐ để được tư vấn
          loại decal phù hợp với chiếc xe của bạn.
        </p>
        <div class="dp36-links">
          <a href="tel:0985500095">0985 500 095</a>
          <a href="https://zalo.me/0985500095"
             target="_blank" rel="noopener noreferrer">
            NHẮN ZALO
          </a>
        </div>
      </section>
    `;

    anchor.insertAdjacentElement("afterend", root);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded", initDecalService
    );
  } else {
    initDecalService();
  }
})();
