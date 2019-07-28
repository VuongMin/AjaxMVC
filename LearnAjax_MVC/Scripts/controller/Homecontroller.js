var homeconfig = {
    pageSize: 5,
    pageIndex: 1,
}
var Home =
{
    init: function () {
        Home.getLoadDataBycontroller(); 
    },
    RegisterEvent: function () {
        $('.txtSalary').off('keypress').on('keypress', function (e) {
            if (e.which == 13) {
                var id = $(this).data('id');
                var val = $(this).val();
                //Gọi phương thức cập nhật
                Home.updateMember(id, val);
            }
        });
        $('#btnadd').off('click').on('click', function () {
            $('#myModal').modal('show');
            Home.ResetFormModal();
        });
        $('#btnsave').off('click').on('click', function () {
            Home.saveData();
        });
        $('.btnEdit').off('click').on('click', function () {
            $('#myModal').modal('show');
            var id = $(this).data('id');
            Home.getEmoloyeeDetail(id);
        });
        $('.btnDelete').off('click').on('click', function () {
            var id = $(this).data('id');
            Home.deleteMember(id);
        });
    },
    ResetFormModal: function () {
        $('#hidID').val(0);
        $('#txtSalary').val(0);
        $('#txtName').val('');
    }
    ,
    getLoadDataBycontroller: function () {
        $.ajax({
            url: "Home/LoadMydata",
            type: "get",
            dataType: "json",
            data:
            {
                page: homeconfig.pageIndex,
                pagesize: homeconfig.pageSize
            },
            success: function (res) {
                if (res.statue == true) {
                    //Truyen data từ bên kia qua 
                    data = res.data;
                    //Bây giờ duyệt qua mảng và hiển thị nó ra html
                    var html = "";
                    var template = $('#templateBilding').html();//ID của template muscashe
                    $.each(data, function (index, item) {
                        html += Mustache.render(template,
                            {
                                ID: item.ID,
                                Name: item.Name,
                                Salary: item.Salary,
                                Statue: item.Statue == true ? "<span class='label label-success'>Active</span>" : "<span class='label label-success'>Locked</span>"
                            });
                    });
                    //Đưa vào tbody
                    $("#tbData").html(html);
                    Home.paging(res.totalRow, function () {
                        Home.getLoadDataBycontroller();
                    });
                    Home.RegisterEvent();
                }
            }

        });
    },
    updateMember: function (id, value) {
        var data = { ID: id, salary: value };
        $.ajax(
            {
                url: 'Home/UpdateMember',
                dataType: 'json',
                type: 'POST',
                data: { model: JSON.stringify(data) },
                success: function (res) {
                    if (res.statue) {
                        alert('Successfully!');
                    } else {
                        alert('had a error!');
                    }
                }
            });
    },
    paging: function (totalRow, callback) {
        var totalPage = Math.ceil(totalRow / homeconfig.pageSize);
        $('#paging').twbsPagination({
            totalPages: totalPage,
            visiblePages: 10,
            onPageClick: function (event, page) {
                homeconfig.pageIndex = page;
                setTimeout(callback, 200);
            }
        });
    },
    saveData: function () {
        var name = $('#txtName').val();
        var salary = parseFloat($('#txtSalary').val());
        var statue = $('#ckbCheck').prop('checked');
        var ID = parseInt($('#hidID').val());

        var employee =
        {
            Name: name,
            Salary: salary,
            Statue: statue,
            ID: ID
        }
        //call ham ajax
        $.ajax(
            {
                url: 'Home/SaveData',
                data: {
                    strEmployee: JSON.stringify(employee)
                },
                dataType: 'json',
                type: 'POST',
                success: function (res) {
                    if (res.statue == true) {
                        alert("Save Successfuly!");

                    }
                }, error: function (err) {
                    console.log(err);
                }
            });
    },
    getEmoloyeeDetail: function (id) {
        $.ajax(
            {
                url: '/Home/getEmployeeDetail',
                type: 'GET',
                dataType: 'json',
                data:
                {
                    ID: id
                },
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        $('#hidID').val(data.ID);
                        $('#txtName').val(data.Name);
                        $('#txtSalary').val(data.Salary);
                        $('#ckbCheck').prop('checked', data.Statue);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
    },
    deleteMember: function (id) {
        $.ajax(
            {
                url: '/Home/deleteItem',
                type: 'POST',
                dataType: 'json',
                data:
                {
                    ID: id
                },
                success: function (response) {
                    if (response.status == true) {
                        alert('Delete Item successfully!');
                        Home.getLoadDataBycontroller(true);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
    }
  

};

Home.init();
