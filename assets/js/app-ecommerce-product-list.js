/**
 * app-ecommerce-product-list
 */

'use strict';


// Datatable (jquery)
$(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table
  var dt_product_table = $('.datatables-products'),
      productAdd = 'add-product.html',
    categoryObj = {
      0: { title: 'Household' },
      1: { title: 'Office' },
      2: { title: 'Electronics' },
      3: { title: 'Shoes' },
      4: { title: 'Accessories' },
      5: { title: 'Game' }
    }
 

  // E-commerce Products datatable

  if (dt_product_table.length) {
    var dt_products = dt_product_table.DataTable({
    ajax: {
  url: 'https://localhost:7130/api/Product/GetAllProductsAsync',
  type: 'GET',
  dataSrc: function (json) {
    // التحقق من أن البيانات تحتوي على مصفوفة
    if (Array.isArray(json.data)) {
      return json.data.map(item => ({
        CategoryId: item.categoryId || 0, // استخدم categoryId الموجود أو قيمة افتراضية
        Name: item.name || 'Unknown', // تعيين الاسم الافتراضي إذا كان غير موجود
        category: item.category?.id || 0, // استخدم id الخاص بـ category إذا وجد
        price: item.price ? `$${item.price}` : '$0', // أضف علامة الدولار للسعر
        DateTime: new Date(item.dateTime).toUTCString(), // تحويل التاريخ إلى صيغة UTC
        MediaUrls: item.mediaUrls?.[0]?.split('\\').pop() || 'default.png', // أخذ الصورة الأولى فقط أو تعيين صورة افتراضية
        Description: item.description || 'No description available' // تعيين وصف افتراضي
      }));
    } else {
      console.error("Unexpected API response format:", json);
      return [];
    }
  }
},


 // JSON file to add data
 columns: [
  { data: 'CategoryId' },
  { data: 'Name' },
  { data: 'category' },
  { data: 'price' },
  { data: 'DateTime' },
  { data: '' } 
],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          searchable: false,
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },

        {
          // Product name and Description
          targets: 1,
          responsivePriority: 1,
          render: function (data, type, full, meta) {
            var $name = full['Name'],
              $CategoryId = full['CategoryId'],
              $Description = full['Description'],
              $MediaUrls = full['MediaUrls'];
var $output = '';

// إذا كانت المصفوفة تحتوي على عناصر، احصل على أول عنصر فقط
if ($MediaUrls && $MediaUrls.length > 0) {
  $output =
    '<img src="' +
    assetsPath +
    'img/ecommerce-images/' +
    $MediaUrls[0] + // استخدام أول عنصر فقط من المصفوفة
 
    $CategoryId +
    '" class="rounded">';
}else {
              // For Product badge
              var stateNum = Math.floor(Math.random() * 6);
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['Description'],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-initial rounded-2 bg-label-' + $state + '">' + $initials + '</span>';
            }
            // Creates full output for Product name and Description
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center product-name">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar avatar me-4 rounded-2 bg-label-secondary">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<h6 class="text-nowrap mb-0">' +
              $name +
              '</h6>' +
              '<small class="text-truncate d-none d-sm-block">' +
              $Description +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // Product category

          targets: 2,
          responsivePriority: 5,
          render: function (data, type, full, meta) {
            var $category = categoryObj[full['category']].title;
            var categoryBadgeObj = {
              Household:
                '<span class="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-warning me-4 p-3"><i class="bx bx-briefcase bx-sm"></i></span>',
              Office:
                '<span class="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-info me-4 p-3"><i class="bx bx-home-smile bx-sm"></i></span>',
              Electronics:
                '<span class="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-danger me-4 p-3"><i class="bx bx-headphone bx-sm"></i></span>',
              Shoes:
                '<span class="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-success me-4"><i class="bx bx-walk bx-sm"></i></span>',
              Accessories:
                '<span class="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-secondary me-4"><i class="bx bxs-watch bx-sm"></i></span>',
              Game: '<span class="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-primary me-4"><i class="bx bx-laptop bx-sm"></i></span>'
            };
            return (
              "<span class='text-truncate d-flex align-items-center text-heading'>" +
              categoryBadgeObj[$category] +
              $category +
              '</span>'
            );
          }
        },
       
        {
          // price
          targets: 3,
          render: function (data, type, full, meta) {
            var $price = full['price'];

            return '<span>' + $price + '</span>';
          }
        },
        {
          // DateTime
          targets: 4,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $DateTime = full['DateTime'];

            return '<span>' + $DateTime + '</span>';
          }
        },

          {
            targets: -1,
            title: 'Actions',
            searchable: false,
            orderable: false,
            render: function (data, type, full, meta) {
              const productId = full['CategoryId'];
              return (
                '<div class="d-inline-block text-nowrap">' +
                `<a href="http://127.0.0.1:5501/edit-product.html?id=${productId}" class="btn btn-icon"><i class="bx bx-edit bx-md"></i></a>` +
                '<button class="btn btn-icon delete-record"><i class="bx bx-trash bx-md"></i></button>' +
                '</div>'
              );
            },
            
            }

      ],
      order: [2, 'asc'], //set any columns order asc/desc
            dom:
        '<"card-header d-flex border-top rounded-0 flex-wrap py-0 flex-column flex-md-row align-items-start"' +
        '<"me-5 ms-n4 pe-5 mb-n6 mb-md-0"f>' +
        '<"d-flex justify-content-start justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex flex-column align-items-start align-items-sm-center justify-content-sm-center pt-0 gap-sm-4 gap-sm-0 flex-sm-row"lB>>' +
        '>t' +
        '<"row"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
   
      language: {
        search: '',
        searchPlaceholder: 'Search Product',
        paginate: {
          next: '<i class="bx bx-chevron-right bx-18px"></i>',
          previous: '<i class="bx bx-chevron-left bx-18px"></i>'
        }
      },
buttons:[
          {
         text: '<i class="bx bx-plus me-0 me-sm-1 bx-xs"></i><span class="d-none d-sm-inline-block">Add Product</span>',
    className: 'add-new btn btn-primary',
       
          action: function () {
            window.location.href = productAdd;
          }
        }
],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['product_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      },

  
    });
    $('.dataTables_length').addClass('mx-n2');
    $('.dt-buttons').addClass('d-flex flex-wrap mb-6 mb-sm-0');
  }

  // Delete Record
  $('.datatables-products tbody').on('click', '.delete-record', function () {
    dt_products.row($(this).parents('tr')).remove().draw();
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});








