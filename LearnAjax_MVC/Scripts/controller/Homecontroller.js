var homeconfig = {
    pageSize: 3,
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
    },
    getLoadDataBycontroller: function () {
        $.ajax({
            url: "Home/LoadMydata",
            type: "get",
            dataType: "json",
            data:
            {
                page: homeconfig.pageIndex,
                pagesize:3
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
    }

};

Home.init();
