(function ($){
    var $dom = $('#todo'),
        $add_input = $dom.find('.js_add_input'),
        $add_btn = $dom.find('.js_add_button'),
        $list = $dom.find('.js_list'),
        $list_arr = JSON.parse(localStorage.getItem('todo') || '[]'),
        $item_template = $('#todo_item_template').text();


    function save() {
        localStorage.setItem('todo', JSON.stringify($list_arr))
    }

    function BuildList() {
        $list.html('');
        $($list_arr).each(function (index, item) {
            var $item = makeItem(item);
            $list.append($item);
            setItemActions($item, index);
        });
    };

    function makeItem (value) {
        var li = $('<li>' + $item_template.replace(/{{val}}/g, value) + '</li>');
        return li;
    }
    function setItemActions(item, index) {
        var $remove_btn = item.find('.js_item_remove_btn'),
            $edit_btn = item.find('.js_item_edit_btn'),
            $edit_input = item.find('.js_item_input'),
            $item_text = item.find('.js_item_text'),
            $apply_btn = item.find('.js_item_apply_btn');

        $remove_btn.on('click', function (){
            $list_arr.splice(index, 1);
            changeAction();
        });

        $edit_btn.on('click', function(){
            $apply_btn.show();
            $edit_btn.hide();
            $edit_input.show();
            $item_text.hide();
        });

        $apply_btn.on('click', function() {
            var edit = $edit_input.val();
            $list_arr[index] = edit;
            changeAction();

            $apply_btn.hide();
            $edit_btn.show();
            $edit_input.hide();
            $item_text.show();
        });
    }

    function changeAction() {
        BuildList();
        save();
    }

    $add_btn.on('click', function() {
        var $text = $add_input.val();
        $list_arr.push($text);
        $add_input.val('');
        changeAction();
    });

    BuildList();


}(jQuery));