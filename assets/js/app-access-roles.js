// /**
//  * App user list
//  */

// "use strict";

// // Datatable (jquery)
// $(function () {
//   var dtUserTable = $(".datatables-users"),
//     dt_User;

//   var userView = "app-user-view-account.html";

//   // Users List datatable
//   if (dtUserTable.length) {
//     dt_User = dtUserTable.DataTable({
//       ajax: assetsPath + "json/user-list.json", // JSON file to add data
//       columns: [
//         { data: "id", visible: false }, // إخفاء العمود الأول (ID) ليكون غير مرئي
//         { data: "id", visible: false }, // إخفاء عمود الاختيار
//         { data: "full_name", width: "40%" }, // تخصيص 40% من العرض لعمود الاسم
//         { data: "role", width: "30%" }, // تخصيص 30% من العرض لعمود الصلاحية
//         { data: "", width: "30%" }, // تخصيص 30% من العرض لعمود الإجراءات
//       ],
//       columnDefs: [
//         {
//           // For Responsive
//           className: "control",
//           orderable: false,
//           searchable: false,
//           responsivePriority: 2,
//           targets: 0,
//           render: function (data, type, full, meta) {
//             return "";
//           },
//         },
//         {
//           // For Checkboxes
//           targets: 1,
//           orderable: false,
//           checkboxes: {
//             selectAllRender: '<input type="checkbox" class="form-check-input">',
//           },
//           render: function () {
//             return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
//           },
//           searchable: false,
//         },
//         {
//           // User full name and email
//           targets: 2,
//           responsivePriority: 4,
//           render: function (data, type, full, meta) {
//             var $name = full["full_name"],
//               $email = full["email"],
//               $image = full["avatar"];
//             if ($image) {
//               // For Avatar image
//               var $output =
//                 '<img src="' +
//                 assetsPath +
//                 "img/avatars/" +
//                 $image +
//                 '" alt="Avatar" class="rounded-circle">';
//             } else {
//               // For Avatar badge
//               var stateNum = Math.floor(Math.random() * 6) + 1;
//               var states = [
//                 "success",
//                 "danger",
//                 "warning",
//                 "info",
//                 "dark",
//                 "primary",
//                 "secondary",
//               ];
//               var $state = states[stateNum],
//                 $name = full["full_name"],
//                 $initials = $name.match(/\b\w/g) || [];
//               $initials = (
//                 ($initials.shift() || "") + ($initials.pop() || "")
//               ).toUpperCase();
//               $output =
//                 '<span class="avatar-initial rounded-circle bg-label-' +
//                 $state +
//                 '">' +
//                 $initials +
//                 "</span>";
//             }
//             var $row_output =
//               '<div class="d-flex justify-content-left align-items-center">' +
//               '<div class="avatar-wrapper">' +
//               '<div class="avatar avatar-sm me-4">' +
//               $output +
//               "</div>" +
//               "</div>" +
//               '<div class="d-flex flex-column">' +
//               '<a href="' +
//               userView +
//               '" class="text-heading text-truncate"><span class="fw-medium">' +
//               $name +
//               "</span></a>" +
//               "<small>@" +
//               $email +
//               "</small>" +
//               "</div>" +
//               "</div>";
//             return $row_output;
//           },
//         },
//         {
//           // User Role without icons
//           targets: 3,
//           render: function (data, type, full, meta) {
//             return (
//               "<span class='text-truncate d-flex align-items-center text-heading'>" +
//               full["role"] +
//               "</span>"
//             );
//           },
//         },
//         {
//           // Actions
//           targets: -1,
//           title: "Actions",
//           searchable: false,
//           orderable: false,
//           render: function (data, type, full, meta) {
//             return (
//               '<div class="d-flex align-items-center">' +
//               '<a href="javascript:;" class="btn btn-icon delete-record"><i class="bx bx-trash bx-md"></i></a>' +
//               '<a href="' +
//               userView +
//               '" class="btn btn-icon"><i class="bx bx-show bx-md"></i></a>' +
//               '<a href="javascript:;" class="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded bx-md"></i></a>' +
//               '<div class="dropdown-menu dropdown-menu-end m-0">' +
//               '<a href="javascript:;" class="dropdown-item">Edit</a>' +
//               '<a href="javascript:;" class="dropdown-item">Suspend</a>' +
//               "</div>" +
//               "</div>"
//             );
//           },
//         },
//       ],
//       order: [[2, "desc"]],
//       dom: '<"row"<"col-sm-12"t>>', // Only table body without search or pagination
//       language: {
//         paginate: {
//           next: "", // Disable pagination arrows
//           previous: "",
//         },
//       },
//     });
//   }
// });
