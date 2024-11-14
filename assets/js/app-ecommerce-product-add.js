/**
 * App eCommerce Add Product Script
 */
'use strict';

//Javascript to handle the e-commerce product add page

(function () {
  // Comment editor

  const commentEditor = document.querySelector('.comment-editor');

  if (commentEditor) {
    new Quill(commentEditor, {
      modules: {
        toolbar: '.comment-toolbar'
      },
      placeholder: 'Product Description',
      theme: 'snow'
    });
  }

  // previewTemplate: Updated Dropzone default previewTemplate

  // ! Don't change it unless you really know what you are doing

  const previewTemplate = `<div class="dz-preview dz-file-preview">
<div class="dz-details">
  <div class="dz-thumbnail">
    <img data-dz-thumbnail>
    <span class="dz-nopreview">No preview</span>
    <div class="dz-success-mark"></div>
    <div class="dz-error-mark"></div>
    <div class="dz-error-message"><span data-dz-errormessage></span></div>
    <div class="progress">
      <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
    </div>
  </div>
  <div class="dz-filename" data-dz-name></div>
  <div class="dz-size" data-dz-size></div>
</div>
</div>`;

  // ? Start your code from here

  // Basic Dropzone

  const dropzoneBasic = document.querySelector('#dropzone-basic');
  if (dropzoneBasic) {
    const myDropzone = new Dropzone(dropzoneBasic, {
      previewTemplate: previewTemplate,
      parallelUploads: 1,
      maxFilesize: 5,
      acceptedFiles: '.jpg,.jpeg,.png,.gif',
      addRemoveLinks: true,
      maxFiles: 1
    });
  }

  // Basic Tags

  const tagifyBasicEl = document.querySelector('#ecommerce-product-tags');
  const TagifyBasic = new Tagify(tagifyBasicEl);

  // Flatpickr

  // Datepicker
  const date = new Date();

  const productDate = document.querySelector('.product-date');

  if (productDate) {
    productDate.flatpickr({
      monthSelectorType: 'static',
      defaultDate: date
    });
  }
})();

//Jquery to handle the e-commerce product add page

$(function () {
  // Select2
  var select2 = $('.select2');
  if (select2.length) {
    select2.each(function () {
      var $this = $(this);
      $this.wrap('<div class="position-relative"></div>').select2({
        dropdownParent: $this.parent(),
        placeholder: $this.data('placeholder') // for dynamic placeholder
      });
    });
  }

  var formRepeater = $('.form-repeater');

  // Form Repeater
  // ! Using jQuery each loop to add dynamic id and class for inputs. You may need to improve it based on form fields.
  // -----------------------------------------------------------------------------------------------------------------

  if (formRepeater.length) {
    var row = 2;
    var col = 1;
    formRepeater.on('submit', function (e) {
      e.preventDefault();
    });
    formRepeater.repeater({
      show: function () {
        var fromControl = $(this).find('.form-control, .form-select');
        var formLabel = $(this).find('.form-label');

        fromControl.each(function (i) {
          var id = 'form-repeater-' + row + '-' + col;
          $(fromControl[i]).attr('id', id);
          $(formLabel[i]).attr('for', id);
          col++;
        });

        row++;
        $(this).slideDown();
        $('.select2-container').remove();
        $('.select2.form-select').select2({
          placeholder: 'Placeholder text'
        });
        $('.select2-container').css('width', '100%');
        $('.form-repeater:first .form-select').select2({
          dropdownParent: $(this).parent(),
          placeholder: 'Placeholder text'
        });
        $('.position-relative .select2').each(function () {
          $(this).select2({
            dropdownParent: $(this).closest('.position-relative')
          });
        });
      }
    });
  }
});






function validateAndSubmitForm() {
    // الحصول على البيانات من الحقول
    const productName = document.getElementById("ecommerce-product-name").value.trim();
    const productDescription = document.getElementById("ecommerce-category-description").innerText.trim();
    const productPrice = document.getElementById("ecommerce-product-price").value.trim();
    const category = document.getElementById("category-org").value;
    
    // التحقق من أن جميع الحقول تحتوي على قيم
    if (!productName) {
        alert("يرجى إدخال اسم المنتج.");
        return; // إيقاف الإرسال إذا كانت البيانات غير مكتملة
    }
    if (!productDescription) {
        alert("يرجى إدخال وصف المنتج.");
        return;
    }
    if (!productPrice) {
        alert("يرجى إدخال سعر المنتج.");
        return;
    }
    if (!category) {
        alert("يرجى اختيار الفئة.");
        return;
    }

    // تحقق من أن الصورة تم رفعها
    const dropzone = Dropzone.forElement("#dropzone-basic");
    if (dropzone.files.length === 0) {
        alert("يرجى رفع صورة للمنتج.");
        return;
    }

    // إعداد البيانات لإرسالها عبر API
    const formData = new FormData();
    formData.append('Name', productName);
    formData.append('Description', productDescription);
    formData.append('CategoryId', category);
    formData.append('price', productPrice);
    formData.append('DateTime', new Date().toISOString());
    formData.append('MediaUrls', dropzone.files[0]); // استخدام الصورة المرفوعة

    // إرسال البيانات عبر API
    fetch('https://localhost:7130/api/Product', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.success) {
            alert("تم نشر المنتج بنجاح!");
        } else {
            alert("فشل نشر المنتج. حاول مرة أخرى.");
        }
    })
    .catch(error => {
        console.error("حدث خطأ أثناء نشر المنتج:", error);
        alert("حدث خطأ أثناء نشر المنتج.");
    });
}

// إضافة حدث عند الضغط على زر "Publish product"
document.querySelector("button[type='submit']").addEventListener("click", function(event) {
    event.preventDefault(); // منع التصرف الافتراضي للنموذج
    validateAndSubmitForm(); // التحقق وإرسال البيانات
});
