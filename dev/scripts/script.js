/*! http://mths.be/placeholder v2.0.7 by @mathias */ ;
(function(h, j, e) {
    var a = "placeholder" in j.createElement("input");
    var f = "placeholder" in j.createElement("textarea");
    var k = e.fn;
    var d = e.valHooks;
    var b = e.propHooks;
    var m;
    var l;
    if (a && f) {
        l = k.placeholder = function() {
            return this
        };
        l.input = l.textarea = true
    } else {
        l = k.placeholder = function() {
            var n = this;
            n.filter((a ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
                "focus.placeholder": c,
                "blur.placeholder": g
            }).data("placeholder-enabled", true).trigger("blur.placeholder");
            return n
        };
        l.input = a;
        l.textarea = f;
        m = {
            get: function(o) {
                var n = e(o);
                var p = n.data("placeholder-password");
                if (p) {
                    return p[0].value
                }
                return n.data("placeholder-enabled") && n.hasClass("placeholder") ? "" : o.value
            },
            set: function(o, q) {
                var n = e(o);
                var p = n.data("placeholder-password");
                if (p) {
                    return p[0].value = q
                }
                if (!n.data("placeholder-enabled")) {
                    return o.value = q
                }
                if (q == "") {
                    o.value = q;
                    if (o != j.activeElement) {
                        g.call(o)
                    }
                } else {
                    if (n.hasClass("placeholder")) {
                        c.call(o, true, q) || (o.value = q)
                    } else {
                        o.value = q
                    }
                }
                return n
            }
        };
        if (!a) {
            d.input = m;
            b.value = m
        }
        if (!f) {
            d.textarea = m;
            b.value = m
        }
        e(function() {
            e(j).delegate("form", "submit.placeholder", function() {
                var n = e(".placeholder", this).each(c);
                setTimeout(function() {
                    n.each(g)
                }, 10)
            })
        });
        e(h).bind("beforeunload.placeholder", function() {
            e(".placeholder").each(function() {
                this.value = ""
            })
        })
    }

    function i(o) {
        var n = {};
        var p = /^jQuery\d+$/;
        e.each(o.attributes, function(r, q) {
            if (q.specified && !p.test(q.name)) {
                n[q.name] = q.value
            }
        });
        return n
    }

    function c(o, p) {
        var n = this;
        var q = e(n);
        if (n.value == q.attr("placeholder") && q.hasClass("placeholder")) {
            if (q.data("placeholder-password")) {
                q = q.hide().next().show().attr("id", q.removeAttr("id").data("placeholder-id"));
                if (o === true) {
                    return q[0].value = p
                }
                q.focus()
            } else {
                n.value = "";
                q.removeClass("placeholder");
                n == j.activeElement && n.select()
            }
        }
    }

    function g() {
        var r;
        var n = this;
        var q = e(n);
        var p = this.id;
        if (n.value == "") {
            if (n.type == "password") {
                if (!q.data("placeholder-textinput")) {
                    try {
                        r = q.clone().attr({
                            type: "text"
                        })
                    } catch (o) {
                        r = e("<input>").attr(e.extend(i(this), {
                            type: "text"
                        }))
                    }
                    r.removeAttr("name").data({
                        "placeholder-password": q,
                        "placeholder-id": p
                    }).bind("focus.placeholder", c);
                    q.data({
                        "placeholder-textinput": r,
                        "placeholder-id": p
                    }).before(r)
                }
                q = q.removeAttr("id").hide().prev().attr("id", p).show()
            }
            q.addClass("placeholder");
            q[0].value = q.attr("placeholder")
        } else {
            q.removeClass("placeholder")
        }
    }
}(this, document, jQuery));

// duration spinner
$('.hhmmss').timespinner({
    format: 'HH:mm:ss',
    step: 1,
    page: 60
});

// multiselect
$('#people').multiSelect();

// time-picker
$('.clockpicker').clockpicker()
    .find('input').change(function() {
        console.log(this.value);
    });
var input = $('#single-input').clockpicker({
    placement: 'bottom',
    align: 'left',
    autoclose: true,
    'default': 'now'
});

// date-picker
if (localStorage.getItem('lang') === null || localStorage.getItem('lang') === 'ar') {
    $('.selector').calendarsPicker($.extend({
        calendar: $.calendars.instance('islamic', 'ar'),
        dateFormat: 'M d, yyyy',
        prevText: 'السابق',
        todayText: 'اليوم',
        nextText: 'التالي',
        clearText: 'مسح',
        closeText: 'اغلاق',
    }));
} else if (localStorage.getItem('lang') === 'en') {
    $('.selector').calendarsPicker($.extend({
        calendar: $.calendars.instance('islamic'),
        dateFormat: 'M d, yyyy',
        prevText: 'prev',
        todayText: 'today',
        nextText: 'next',
        clearText: 'clear',
        closeText: 'close',
    }));
}

// text editor
$('.gre').gre();

// tree-table
$('.treeTable').simpleTreeTable({
    expander: $('#expander'),
    collapser: $('#collapser'),
    store: 'session',
    storeKey: 'simple-tree-table-basic'
});

$(function() {
    var $win = $(window),
        $doc = $(document),
        $body = $(document.body);

    $.ajaxSetup({
        cache: false
    });

    $('input[placeholder], textarea[placeholder]').placeholder();

    // display modal on top of modal
    $doc.on('show.bs.modal', '.modal', function(event) {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });

    // add rows
    $(document).on('click', '.plus', function() {
        var dataAttr = $(this).data("attr");
        var tablebody = $('table[data-attr =' + dataAttr + ']').children("tbody");
        var txtVal = $(this).siblings('input').val();
        var newRow = '<tr><td> ' + txtVal + ' </td><td><button data-toggle="modal" data-target="#staticBackdrop"><i class="far fa-trash-alt"></i> </button><button><i class="far fa-edit"></i></button> <input type="checkbox" name="ch48" id="ch48"class="styled-checkbox"><label for="ch48"></label></td></tr>';

        if (txtVal != "") {
            tablebody.append(newRow);
        }
    });

    ///////////////////////// commitees creation /////////////////////////

    $(document).on('click', '#change_status', function() {
        $('.hidden-status').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none');
    });


    $(document).on('click', '#add-goal', function() {
        $('.hidden-goal').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
    });

    $(document).on('click', '#add-mentor', function() {
        $('.hidden-mentor').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
    });

    $(document).on('click', '.close-status', function() {
        $('.hidden-status').toggle();
        $('#change_status').removeClass('disabled');
        $('#change_status').css('pointer-events', 'inherit')
    });

    $(document).on('click', '.close-goal', function() {
        $('.hidden-goal').toggle();
        $('#add-goal').removeClass('disabled');
        $('#add-goal').css('pointer-events', 'none')
    });

    $(document).on('click', '.close-mentor', function() {
        $('.hidden-mentor').toggle();
        $('#add-mentor').removeClass('disabled');
        $('#add-mentor').css('pointer-events', 'none')
    });

    $(document).on('click', '.show_edit', function() {
        $('.edit-lagna').toggle();
    });

    $(document).on('click', '.show-reason', function() {
        $('.edit-lagna').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $('.hidden-reason').toggle();
    });

    $(document).on('click', '.hide-reason', function() {
        $('.show-reason').removeClass('disabled');
        $('.show-reason').css('pointer-events', 'inherit');
        $('.hidden-reason').toggle();
    });

    $(document).on('click', '.show-reason2', function() {
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $('.hidden-reason2').toggle();
    });

    $(document).on('click', '.hide-reason2', function() {
        $('.show-reason2').removeClass('disabled');
        $('.show-reason2').css('pointer-events', 'inherit');
        $('.hidden-reason2').toggle();
    });

    $(document).on('click', '.show-reason3', function() {
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $('.hidden-reason3').toggle();
    });

    $(document).on('click', '.hide-reason3', function() {
        $('.show-reason3').removeClass('disabled');
        $('.show-reason3').css('pointer-events', 'inherit');
        $('.hidden-reason3').toggle();
    });

    $(document).on('click', '.show-members', function() {
        $('.hidden-members').toggle();
    });

    $(document).on('click', '.send_letter', function() {
        $('.hidden-letter').toggle();
    });

    $(document).on('click', '.hide-letter', function() {
        $('.hidden-letter').toggle();
    });

    $(document).on('click', '.rewrite_letter', function() {
        if ($('.hidden-letter2')[0].style.display == "") {
            $('.hidden-letter2')[0].style.display = "flex";
        } else if ($('.hidden-letter2')[0].style.display == "flex") {
            $('.hidden-letter2')[0].style.display = "";
        }
    });

    $(document).on('change', '.check-lagna', function() {
        $('.hidden-lagna').toggle();
    });

    $(document).on('change', '.selectBox', function() {
        $(this).parents('tr').find('input').prop('checked', false);
    });

    $('.round').children('input').change(function() {
        if ($(this)[0].checked == true) {
            console.log($(this).siblings()[1].innerText = " موافق");
        } else if ($(this)[0].checked == false) {
            console.log($(this).siblings()[1].innerText = " غير موافق");
        }
    });

    $(document).on('click', '.filter-moraslat', function() {
        $('.filters').toggle();
    });

    $(document).on('click', '.filter-member', function() {
        $('.filters2').toggle();
    });

    $(document).on('click', '.filter-member2', function() {
        $('.filters3').toggle();
    });

    $(document).on('click', '#show-files', function() {
        if ($('.show-files')[0].style.display == "") {
            $('.show-files')[0].style.display = 'block'
        } else if ($('.show-files')[0].style.display == 'block') {
            $('.show-files')[0].style.display = ""
        }
    });


    $(document).click(function(e) {
        if ($(e.target).is('.modal')) {
            $('.modal').modal('hide');
        }

    });

    ////////////// meeting view //////////////

    $(document).on('click', '.meeting-name', function() {
        $('.hidden-meeting').hide();
        $('.meeting-request').hide();
        $('.meeting-table').hide();
        $('.meeting-view').show();
    });

    $(document).on('click', '.change_status2', function() {
        $('.status2').toggle();
        // $(this).prop("disabled", true);
        // $(this).html(
        //     '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
        // );
    });

    $(document).on('click', '.create-minutes', function() {
        $('.hidden-minutes').toggle()
        $(this).hide()
    });

    $(document).on('click', '.close-minutes', function() {
        $('.hidden-minutes').toggle()
        $('.create-minutes').show();
    });

    $(document).on('click', '.invite-member2', function() {
        $('.hidden-member2').toggle();
        $('.toggled-form-member2').hide();
    });

    $(document).on('click', '.add-object2', function() {
        $('.hidden-object2').toggle();
        $('.toggled-form-object2').hide();
    });

    $(document).on('click', '.cancel-object2', function() {
        $('.hidden-object2').toggle();
        $('.toggled-form-object2').show();
    });


    $(document).on('click', '.cancel-member2', function() {
        $('.hidden-member2').toggle();
        $('.toggled-form-member2').show();
    });

    $(document).on('change', '.filter-members', function() {
        if ($(this).val() == "all-members") {
            $('div.all-members').show();
            $('div.existed-members').hide();
        } else if ($(this).val() == "existed-members") {
            $('div.all-members').hide();
            $('div.existed-members').show();
        }
    });

    ////////////// meeting creation //////////////

    $(document).on('click', '.move-to-meeting', function() {
        $('.hidden-meeting').hide();
        $('.meeting-table').show();
        $('.meeting-request').hide();
        $('.meeting-view').hide();
    });


    $(document).on('click', '.add-meeting', function() {
        $('.hidden-meeting').show();
        $('.meeting-table').hide();
        $('.meeting-request').hide();
    });

    $(document).on('click', '.cancel-meeting', function() {
        $('.hidden-meeting').hide();
        $('.meeting-request').hide();
        $('.meeting-table').show();
    });

    $(document).on('click', '.add-place', function() {
        $('.hidden-meeting').hide();
        $('.meeting-table').hide();
        $('.meeting-place').show();
    });

    $(document).on('click', '.close-place', function() {
        $('.hidden-meeting').show();
        $('.meeting-place').hide();
        $('.meeting-request').hide();
    });

    $(document).on('click', '.request-meeting', function() {
        $('.meeting-table').hide();
        $('.meeting-place').hide();
        $('.meeting-request').show();
    });

    $(document).on('click', '.cancel-request', function() {
        $('.meeting-table').show();
        $('.meeting-request').hide();
        $('.meeting-place').hide();
    });

    $(document).on('click', '.invite-member', function() {
        $('.hidden-member').toggle();
        $('.toggled-form-member').hide();
    });


    $(document).on('click', '.add-mission', function() {
        $('.hidden-mission').toggle();
        $('.toggled-form-mission').hide();
    });

    $(document).on('click', '.add-file', function() {
        $('.hidden-file').toggle();
        $('.toggled-form-file').hide();
    });

    $(document).on('click', '.add-object', function() {
        $('.hidden-object').toggle();
        $('.toggled-form-object').hide();
        $(".mission-check").css('display', 'flex');
    });


    $(document).on('click', '.cancel-object', function() {
        $('.hidden-object').toggle();
        $('.toggled-form-object').show();
        $(".mission-check").css('display', 'none');
    });


    $(document).on('click', '.cancel-member', function() {
        $('.hidden-member').toggle();
        $('.toggled-form-member').show();
    });


    $(document).on('click', '.cancel-file', function() {
        $('.hidden-file').toggle();
        $('.toggled-form-file').show();
    });

    $(document).on('change', '.specify', function() {
        if ($('.specified-privliges')[0].style.display == "") {
            $('.specified-privliges')[0].style.display = 'flex'
        } else if ($('.specified-privliges')[0].style.display == 'flex') {
            $('.specified-privliges')[0].style.display = ""
        }
    });

    $(document).on('click', '.re-meeting', function() {
        $(this).addClass('disabled')
        $(this).css('pointer-events', 'none')
        $('.new-appointment').toggle();
    });

    $(document).on('click', '.re-meeting2', function() {
        $(this).addClass('disabled')
        $(this).css('pointer-events', 'none')
        $('.new-appointment2').toggle();
    });

    $(document).on('click', '.close-appointment', function() {
        $('.re-meeting').removeClass('disabled')
        $('.re-meeting').css('pointer-events', 'inherit');
        $('.new-appointment').toggle();
    });

    $(document).on('click', '.close-appointment2', function() {
        $('.re-meeting2').removeClass('disabled')
        $('.re-meeting2').css('pointer-events', 'inherit');
        $('.new-appointment2').toggle();
    });

    $(document).on('click', '.change_appointment', function() {
        $('.other-appointment').toggle();
    });

    $(document).on('click', '.change_appointment', function() {
        $('.other-appointment').toggle();
    });

    $(document).on('click', '.request-appointment', function() {
        $('.show-appointment').toggle();
    });

    $(document).on('click', '.close-other-appointment', function() {
        $('.show-appointment').hide();
    });

    $(document).on('click', '.back-response2', function() {
        $('.members-response2').show();
        $('.members-response1').hide();
    });

    $(document).on('click', '.back-response1', function() {
        $('.members-response2').hide();
        $('.members-response1').show();
    });

    $(document).on('click', '.apply-task', function() {
        $('.task-container').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none');
    });

    $(document).on('click', '.close-task', function() {
        $('.task-container').toggle();
    });

    $(document).on('click', '.resend-meeting', function() {
        $('.meeting-revise').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
    })

    $(document).on('click', '.close-revise2', function() {
        $('.meeting-revise').toggle();
        $('.resend-meeting').removeClass('disabled');
        $('.resend-meeting').css('pointer-events', 'inherit')
    })


    ///////////////////////////// statement /////////////////////////////

    $(document).on('click', '.request-efada', function() {
        $('.request-statement').show();
        $('.add-statement').hide();
        $('.toggled-form-efada').hide();
    })

    $(document).on('click', '.cancel-statement-request', function() {
        $('.request-statement').hide();
        $('.toggled-form-efada').show();
    })

    $(document).on('click', '.add-efada', function() {
        $('.add-statement').show();
        $('.request-statement').hide();
        $('.toggled-form-efada').hide();
    })

    $(document).on('click', '.cancel-statement-add', function() {
        $('.add-statement').hide();
        $('.toggled-form-efada').show();
    })

    $(document).on('click', '.resend-efada', function() {
        $('.efada-revise2').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
    })

    $(document).on('click', '.close-revise', function() {
        $('.efada-revise2').toggle();
        $('.resend-efada').removeClass('disabled');
        $('.resend-efada').css('pointer-events', 'inherit')
    })

    ///////////////////////// missions /////////////////////////

    $(document).on('click', '.add-mission2', function() {
        $('.show-mission').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-mission2', function() {
        $('.show-mission').hide();
        $('.add-mission2').removeClass('disabled');
        $('.add-mission2').show();
        $('.add-mission2').css('pointer-events', 'inherit')
    })

    $(document).on('click', '.add-mission22', function() {
        $('.show-mission22').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-mission22', function() {
        $('.show-mission22').hide();
        $('.add-mission22').removeClass('disabled');
        $('.add-mission22').show();
        $('.add-mission22').css('pointer-events', 'inherit')
    })

    $(document).on('click', '.add-taklef', function() {
        $('.show-taklef').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-taklef', function() {
        $('.show-taklef').hide();
        $('.add-taklef').removeClass('disabled');
        $('.add-taklef').show();
        $('.add-taklef').css('pointer-events', 'inherit')
    })

    $(document).on('click', '.add-study', function() {
        $('.show-study').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-study', function() {
        $('.show-study').hide();
        $('.add-study').removeClass('disabled');
        $('.add-study').show();
        $('.add-study').css('pointer-events', 'inherit')
    })

    ///////////////////////// voting /////////////////////////

    $(document).on('click', '.add-vote', function() {
        $('.show-vote').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-vote', function() {
        $('.show-vote').hide();
        $('.add-vote').removeClass('disabled');
        $('.add-vote').show();
        $('.add-vote').css('pointer-events', 'inherit')
    })

    $(document).on('click', '.add-vote2', function() {
        $('.show-vote2').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-vote2', function() {
        $('.show-vote2').hide();
        $('.add-vote2').removeClass('disabled');
        $('.add-vote2').show();
        $('.add-vote2').css('pointer-events', 'inherit')
    })

    $(document).on('change', '#specifyMembers', function() {
        $('.specified-privliges2').toggle();
    })

    $(document).on('change', '#specifyMembers2', function() {
        $('.specified-privliges200').toggle();
    })

    $(document).on('change', '#privilage22', function() {
        if ($('.specified-privliges3')[0].style.display == "") {
            $('.specified-privliges3')[0].style.display = 'flex'
        } else if ($('.specified-privliges3')[0].style.display == 'flex') {
            $('.specified-privliges3')[0].style.display = ""
        }
    })

    $(document).on('change', '#privilage222', function() {
        if ($('.specified-privliges33')[0].style.display == "") {
            $('.specified-privliges33')[0].style.display = 'flex'
        } else if ($('.specified-privliges33')[0].style.display == 'flex') {
            $('.specified-privliges33')[0].style.display = ""
        }
    })


    ///////////////////////// decision /////////////////////////

    $(document).on('click', '.add-decision', function() {
        $('.show-decision').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-decision', function() {
        $('.show-decision').hide();
        $('.add-decision').removeClass('disabled');
        $('.add-decision').show();
        $('.add-decision').css('pointer-events', 'inherit')
    })

    $(document).on('click', '.add-decision2', function() {
        $('.show-decision2').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-decision2', function() {
        $('.show-decision2').hide();
        $('.add-decision2').removeClass('disabled');
        $('.add-decision2').show();
        $('.add-decision2').css('pointer-events', 'inherit')
    })


    ///////////////////////// recommendation /////////////////////////

    $(document).on('click', '.add-recommendation', function() {
        $('.show-recommendation').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-recommendation', function() {
        $('.show-recommendation').hide();
        $('.add-recommendation').removeClass('disabled');
        $('.add-recommendation').show();
        $('.add-recommendation').css('pointer-events', 'inherit')
    })

    $(document).on('click', '.add-recommendation2', function() {
        $('.show-recommendation2').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-recommendation2', function() {
        $('.show-recommendation2').hide();
        $('.add-recommendation2').removeClass('disabled');
        $('.add-recommendation2').show();
        $('.add-recommendation2').css('pointer-events', 'inherit')
    })

    ///////////////////////// announcement /////////////////////////

    $(document).on('click', '.add-announcement', function() {
        $('.show-announcement').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-announcement', function() {
        $('.show-announcement').hide();
        $('.add-announcement').removeClass('disabled');
        $('.add-announcement').show();
        $('.add-announcement').css('pointer-events', 'inherit')
    })

    $(document).on('click', '.add-announcement2', function() {
        $('.show-announcement2').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-announcement', function() {
        $('.show-announcement2').hide();
        $('.add-announcement2').removeClass('disabled');
        $('.add-announcement2').show();
        $('.add-announcement2').css('pointer-events', 'inherit')
    })

    ///////////////////////// files /////////////////////////

    $(document).on('click', '.add-files', function() {
        $('.show-files').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-files', function() {
        $('.show-files').hide();
        $('.add-files').removeClass('disabled');
        $('.add-files').show();
        $('.add-files').css('pointer-events', 'inherit')
    })

    $(document).on('click', '.add-files2', function() {
        $('.show-files2').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
        $(this).hide()
    })

    $(document).on('click', '.close-files2', function() {
        $('.show-files2').hide();
        $('.add-files2').removeClass('disabled');
        $('.add-files2').show();
        $('.add-files2').css('pointer-events', 'inherit')
    })

    $(document).on('click', '.add_file', function() {
        $('#add_file').toggle();
        $(this).hide();
    })

    $(document).on('click', '.close_file', function() {
        $('#add_file').hide();
        $('.add_file').show();
    })

    $(document).on('click', '.add_template', function() {
        $('#add_template').toggle();
        $(this).hide();
    })

    $(document).on('click', '.close_template', function() {
        $('#add_template').hide();
        $('.add_template').show();
    })

    $(document).on('click', '.add_mogalad', function() {
        $('#add_mogalad').toggle();
        $(this).hide();
    })

    $(document).on('click', '.close_mogalad', function() {
        $('#add_mogalad').hide();
        $('.add_mogalad').show();
    })

    $(document).on('click', '.add_holiday', function() {
        $('#add_holiday').toggle();
        $(this).hide();
    })

    $(document).on('click', '.close_holiday', function() {
        $('#add_holiday').hide();
        $('.add_holiday').show();
    })

    $(document).on('click', '.add_group', function() {
        $('#add_group').toggle();
        $(this).hide();
    })

    $(document).on('click', '.close_group', function() {
        $('#add_group').hide();
        $('.add_group').show();
    })

    $(document).on('click', '.add_role', function() {
        $('#add_role').toggle();
        $(this).hide();
    })

    $(document).on('click', '.close_role', function() {
        $('#add_role').hide();
        $('.add_role').show();
    })

    ///////////////////////// merge /////////////////////////

    $(document).on('click', '.merge-lagna', function() {
        $('.new-merge').toggle();
        $(this).hide()
    })

    $(document).on('click', '.close-merge', function() {
        $('.new-merge').hide();
        $('.merge-lagna').show();
    })

    ///////////////////////// email /////////////////////////

    $(document).on('click', '.add-mail2', function() {
        $('.show-mail2').toggle();
        $(this).hide()
    })

    $(document).on('click', '.close-mail2', function() {
        $('.add-mail2').hide();
        $('.show-mail2').show();
    })

    $(document).on('click', '.add-mail', function() {
        $('.show-mail').toggle();
        $(this).hide()
    })

    $(document).on('click', '.close-mail', function() {
        $('#show-mail').hide();
        $('.add-mail').show();
    })

    ///////////////////////// close /////////////////////////

    $(document).on('click', '.close-lagna', function() {
        $('.new-reopen').hide();
        $('.new-close').toggle();
        $('.toggled-form-merge').hide()
    })

    $(document).on('click', '.close-close', function() {
        $('.new-close').hide();
        $('.close-lagna').show();
        $('.toggled-form-merge').show()
    })

    ///////////////////////// reopen /////////////////////////

    $(document).on('click', '.reopen-lagna', function() {
        $('.new-reopen').toggle();
        $('.new-close').hide();
        $('.toggled-form-merge').hide()
    })

    $(document).on('click', '.close-reopen', function() {
        $('.new-reopen').hide();
        $('.reopen-lagna').show();
        $('.toggled-form-merge').show()
    })


    ///////////////////////// delegation /////////////////////////

    $(document).on('click', '.resend-delegate', function() {
        $('.sent-delegate').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
    })

    $(document).on('click', '.close-sent-delegate', function() {
        $('.sent-delegate').toggle();
        $('.resend-delegate').removeClass('disabled');
        $('.resend-delegate').css('pointer-events', 'inherit');
    })

    $(document).on('click', '.resend-delegate2', function() {
        $('.sent-delegate2').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
    })

    $(document).on('click', '.close-sent-delegate2', function() {
        $('.sent-delegate2').toggle();
        $('.resend-delegate2').removeClass('disabled');
        $('.resend-delegate2').css('pointer-events', 'inherit');
    })


    ///////////////////////// return /////////////////////////

    $(document).on('click', '.resend-to-member', function() {
        $('.resent-to-member').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
    })

    $(document).on('click', '.close-sent-to-member', function() {
        $('.resent-to-member').toggle();
        $('.resend-to-member').removeClass('disabled');
        $('.resend-to-member').css('pointer-events', 'inherit');
    })


    ///////////////////////// assign /////////////////////////

    $(document).on('click', '.request-assign', function() {
        $('#show-assign').toggle();
        $(this).hide()
    })

    $(document).on('click', '.close-assign', function() {
        $('#show-assign').toggle();
        $('.request-assign').show()
    })

    $(document).on('click', '.resend-assign', function() {
        $('.sent-assign').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
    })

    $(document).on('click', '.close-sent-assign', function() {
        $('.sent-assign').toggle();
        $('.resend-assign').removeClass('disabled');
        $('.resend-assign').css('pointer-events', 'inherit');
    })

    $(document).on('click', '.resend-assign2', function() {
        $('.sent-assign2').toggle();
        $(this).addClass('disabled');
        $(this).css('pointer-events', 'none')
    })

    $(document).on('click', '.close-sent-assign2', function() {
        $('.sent-assign2').toggle();
        $('.resend-assign2').removeClass('disabled');
        $('.resend-assign2').css('pointer-events', 'inherit');
    })

    ///////////////////////// members /////////////////////////

    $(document).on('click', '.add-new-member', function() {
        $('.added-new-member').toggle();
        $(this).hide()
    })

    $(document).on('click', '.delegate-new-member', function() {
        $('.delegated-new-member').toggle();
        $(this).hide();
    })

    $(document).on('click', '.close-new-member', function() {
        $('.added-new-member').toggle();
        $('.add-new-member').show()
    })

    $(document).on('click', '.close-new-delegate', function() {
        $('.delegated-new-member').toggle();
        $('.delegate-new-member').show()
    })

    ///////////////////////// gehat /////////////////////////

    $(document).on('click', '.add-notification', function() {
        $('.show-notification').toggle();
        $(this).hide()
    })

    $(document).on('click', '.close-notification', function() {
        $('.show-notification').toggle();
        $('.add-notification').show()
    })

    ///////////////////////// notifications /////////////////////////

    $(document).on('click', '.add-new-geha', function() {
        $('.added-new-geha').toggle();
        $(this).hide()
    })

    $(document).on('click', '.close-new-geha', function() {
        $('.added-new-geha').toggle();
        $('.add-new-geha').show()
    })



    ///////////////////////// cpllapse /////////////////////////
    $(document).on('click', '.legan1 .collaps', function() {
        if ($(this).hasClass('collapsed') == true) {
            $(this).siblings('p')[0].style.color = "#1ABBAD"
        } else {
            $(this).siblings('p')[0].style.color = "black"
        }
    })


    $(document).on('click', '.accept', function() {
        $('.accept-recomendation').toggle();
    })


    ///////////////////////// wizard /////////////////////////

    var current_fs, next_fs, previous_fs;
    var opacity;

    $(".next").click(function() {

        current_fs = $(this).closest('fieldset');
        next_fs = $(this).closest('fieldset').next();

        //Add Class Active , Done
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        $("#progressbar li").eq($("fieldset").index(current_fs)).addClass("done");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({
                    'opacity': opacity
                });
            },
            duration: 600
        });
    });

    $(".previous").click(function() {

        current_fs = $(this).closest('fieldset');
        previous_fs = $(this).closest('fieldset').prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({
                    'opacity': opacity
                });
            },
            duration: 600
        });
    });

    /////////// tabs ///////////
    // for single-level tabs
    $("div.as-vertical-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        var toggled_div = $(this).parents(".as-vertical-tab-menu").siblings(".as-vertical-tab").children('.as-vertical-tab-content');
        toggled_div.removeClass("active");
        toggled_div.eq(index).addClass("active");
    });

    // for multi-level tabs level1
    $("div.multi-level>div.list-group a").click(function(e) {
        e.preventDefault();
        $('.multi-level>div.list-group a').siblings('a.active').removeClass("active");
        $(this).addClass("active");

        var items = $('.multi-level>div.list-group a');
        var indexx;

        $.each(items, function(i, e) {
            if (e.classList.contains(('active')) == true) {
                indexx = i;
            }
        });

        var toggled_div = $(this).parents(".as-vertical-tab-menu").siblings(".as-vertical-tab").children('.as-vertical-tab-content');
        toggled_div.removeClass("active");
        toggled_div.eq(indexx).addClass("active");
    });

    // for multi-level tabs level2
    $("div.multi-level>div.list-group div.group div.menu a").click(function(e) {
        e.preventDefault();
        $('.menu').children('a.active').removeClass("active");
        $(this).parents('.group').siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var items = $('.multi-level>div.list-group a');
        var indexx;

        $.each(items, function(i, e) {
            if (e.classList.contains(('active')) == true) {
                indexx = i;
            }
        });

        var toggled_div = $(this).parents(".as-vertical-tab-menu").siblings(".as-vertical-tab").children('.as-vertical-tab-content');
        toggled_div.removeClass("active");
        toggled_div.eq(indexx).addClass("active");
    });

    // select2
    $(".selNumber").select2();
    $(".meetingOBJ").select2();
    // Read selected option
    $('#but_read').click(function() {
        var username = $('.selNumber option:selected').text();
    });


    $('#noti_Button').click(function() {
        // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
        $('#notifications').fadeToggle('fast', 'linear');
        //$('#noti_Counter').fadeOut('slow');     // HIDE THE COUNTER.
        return false;
    });

    // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
    $doc.click(function() {
        $('#notifications').hide();
    });
    $('#notifications').click(function() {
        return false; // DO NOTHING WHEN CONTAINER IS CLICKED.
    });
    // end it



    function modalTemp(modalId, modalSize, modalTitle) {
        return [
            '<div class="modal" tabindex="-1" role="dialog" id="' + modalId + '">',

            '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ' + modalSize + '" role="document">',
            '<div class="modal-content">',

            '<div class="modal-header">',
            '<h5 class="modal-title">' + modalTitle + '</h5>',
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">',
            '<span aria-hidden="true">&times;</span>',
            '</button>',
            '</div>',

            '<div class="modal-body" id="modalBody"></div>',

            '</div>',
            '</div>',

            '</div>'
        ].join('')
    }

    $doc.on("click", ".modal-body .nav .nav-link", function() {
        tab = $(this).attr("href");
        $(".modal-body .tab-pane").each(function() {
            $(this).removeClass("show active");
        });
        $(".modal-body .tab-content " + tab).addClass("show active");
    });


    //// search
    // add class focused to expend search input
    $('.global-search .search_input').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        var $inputVal = $(this).val();
        if (!$inputVal.length || $inputVal == '') {
            $(this).parent().removeClass('focused');
        }
    });


    //////////// js-select2
    $('.js-select2').each(function(index, item) {
        var $item = $(item),
            option = $item.data('select');
        $item.select2(option)
    });

});

// theme
$(document).on('click', '#changeToLight', function(e) {
    e.preventDefault();
    localStorage.setItem('theme', 'root');
    $('html')[0].classList.add('root');
    $('html')[0].classList.remove('dark');
    $(this)[0].style.display = 'none';
    $('#changeToDark')[0].style.display = 'flex';
    $('.logo')[0].style.background = 'url("images/commColor.png") no-repeat 0 0';
    $('.errorlogo').attr('src', "images/icons/Group1.png")
    $('.overlay')[0].style.background = 'rgba(22, 25, 39, 0)';
})

$(document).on('click', '#changeToDark', function(e) {
    e.preventDefault();
    localStorage.setItem('theme', 'dark');
    $('html')[0].classList.add('dark');
    $('html')[0].classList.remove('root');
    $(this)[0].style.display = 'none';
    $('#changeToLight')[0].style.display = 'flex';
    $('.logo')[0].style.background = 'url("images/commWhite.png") no-repeat 0 0';
    $('.errorlogo').attr('src', "images/icons/Group2.png")
    $('.overlay')[0].style.background = 'rgba(22, 25, 39, 0.85)';
})

document.getElementById("arabicLang").addEventListener('click', function(e) {
    e.preventDefault()
    localStorage.setItem('lang', 'en');
    var initialLocaleCode = 'en';
    var srcCalendarEl = document.getElementById('source-calendar');

    if (srcCalendarEl) {
        var srcCalendar = new FullCalendar.Calendar(srcCalendarEl, {
            editable: true,
            initialDate: '2020-09-12',
            locale: initialLocaleCode,
            events: [{
                start: '2020-09-01',
                backgroundColor: '#9B5ADC',
                borderColor: '#9B5ADC'
            }, {
                start: '2020-09-07',
                end: '2020-09-10',
                backgroundColor: '#1ABBAD',
                borderColor: '#1ABBAD'
            }],
            eventLeave: function(info) {
                console.log('event left!', info.event);
            }
        });

        srcCalendar.render();
        srcCalendar.setOption('locale', 'en');
    }

    var calendarEl = document.getElementById('calendar');

    if (calendarEl) {
        var calendar = new FullCalendar.Calendar(calendarEl, {
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            },
            initialDate: '2020-09-12',
            locale: initialLocaleCode,
            buttonIcons: false, // show the prev/next text
            weekNumbers: true,
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            dayMaxEvents: true, // allow "more" link when too many events
            events: [{
                title: 'All Day Event',
                start: '2020-09-01',
                backgroundColor: '#9B5ADC',
                borderColor: '#9B5ADC'
            }, {
                title: 'Long Event',
                start: '2020-09-07',
                end: '2020-09-10',
                backgroundColor: '#1ABBAD',
                borderColor: '#1ABBAD'
            }, {
                groupId: 999,
                title: 'Repeating Event',
                start: '2020-09-09T16:00:00',
                backgroundColor: '#75A9F2',
                borderColor: '#75A9F2'
            }, {
                groupId: 999,
                title: 'Repeating Event',
                start: '2020-09-16T16:00:00'
            }, {
                title: 'Conference',
                start: '2020-09-11',
                end: '2020-09-13'
            }, {
                title: 'Meeting',
                start: '2020-09-12T10:30:00',
                end: '2020-09-12T12:30:00'
            }, {
                title: 'Lunch',
                start: '2020-09-12T12:00:00'
            }, {
                title: 'Meeting',
                start: '2020-09-12T14:30:00'
            }, {
                title: 'Happy Hour',
                start: '2020-09-12T17:30:00'
            }, {
                title: 'Dinner',
                start: '2020-09-12T20:00:00'
            }, {
                title: 'Birthday Party',
                start: '2020-09-13T07:00:00'
            }, {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2020-09-28'
            }]
        });

        calendar.render();

        calendar.setOption('locale', 'en');

    }

    $('html').attr('dir', 'ltr');
    // $('.switchFormContainer')[0].style.display = 'none';
    // $('.top-header')[0].style.background = '#fff url("../images/topleft-right.png") no-repeat right center';
    $('link').attr('href', 'css/style-reverse.css');


    $('.selector').calendarsPicker('destroy') // disable datepicker and field 

    $('.selector').calendarsPicker($.extend({
        calendar: $.calendars.instance('islamic'),
        dateFormat: 'M d, yyyy',
        prevText: 'prev',
        todayText: 'today',
        nextText: 'next',
        clearText: 'clear',
        closeText: 'close',
    }));

    $('.selector').calendarsPicker('enable') // enable datepicker and field 


    $(this)[0].style.display = 'none';
    $('#englishLang')[0].style.display = 'flex';

});


document.getElementById("englishLang").addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('lang', 'ar');
    var initialLocaleCode = 'ar';

    var srcCalendarEl = document.getElementById('source-calendar');

    if (srcCalendarEl) {
        var srcCalendar = new FullCalendar.Calendar(srcCalendarEl, {
            editable: true,
            initialDate: '2020-09-12',
            locale: initialLocaleCode,
            events: [{
                start: '2020-09-01',
                backgroundColor: '#9B5ADC',
                borderColor: '#9B5ADC'
            }, {
                start: '2020-09-07',
                end: '2020-09-10',
                backgroundColor: '#1ABBAD',
                borderColor: '#1ABBAD'
            }],
            eventLeave: function(info) {
                console.log('event left!', info.event);
            }
        });

        srcCalendar.render();
        srcCalendar.setOption('locale', 'ar-sa');
    }

    var calendarEl = document.getElementById('calendar');

    if (calendarEl) {
        var calendar = new FullCalendar.Calendar(calendarEl, {
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            },
            initialDate: '2020-09-12',
            locale: initialLocaleCode,
            buttonIcons: false, // show the prev/next text
            weekNumbers: true,
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            dayMaxEvents: true, // allow "more" link when too many events
            events: [{
                title: 'All Day Event',
                start: '2020-09-01',
                backgroundColor: '#9B5ADC',
                borderColor: '#9B5ADC'
            }, {
                title: 'Long Event',
                start: '2020-09-07',
                end: '2020-09-10',
                backgroundColor: '#1ABBAD',
                borderColor: '#1ABBAD'
            }, {
                groupId: 999,
                title: 'Repeating Event',
                start: '2020-09-09T16:00:00',
                backgroundColor: '#75A9F2',
                borderColor: '#75A9F2'
            }, {
                groupId: 999,
                title: 'Repeating Event',
                start: '2020-09-16T16:00:00'
            }, {
                title: 'Conference',
                start: '2020-09-11',
                end: '2020-09-13'
            }, {
                title: 'Meeting',
                start: '2020-09-12T10:30:00',
                end: '2020-09-12T12:30:00'
            }, {
                title: 'Lunch',
                start: '2020-09-12T12:00:00'
            }, {
                title: 'Meeting',
                start: '2020-09-12T14:30:00'
            }, {
                title: 'Happy Hour',
                start: '2020-09-12T17:30:00'
            }, {
                title: 'Dinner',
                start: '2020-09-12T20:00:00'
            }, {
                title: 'Birthday Party',
                start: '2020-09-13T07:00:00'
            }, {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2020-09-28'
            }]
        });

        calendar.render();
        calendar.setOption('locale', 'ar-sa');

    }

    $('html').attr('dir', 'rtl');
    // $('.switchFormContainer')[0].style.display = 'flex';
    // $('.top-header')[0].style.background = '#fff url("../images/bg_art_topleft.png") no-repeat left center';
    $('link').attr('href', 'css/style.css');


    $('.selector').calendarsPicker('destroy') // disable datepicker and field 

    $('.selector').calendarsPicker($.extend({
        calendar: $.calendars.instance('islamic', 'ar'),
        dateFormat: 'M d, yyyy',
        prevText: 'السابق',
        todayText: 'اليوم',
        nextText: 'التالي',
        clearText: 'مسح',
        closeText: 'اغلاق',
    }));

    $('.selector').calendarsPicker('enable') // disable datepicker and field 

    $(this)[0].style.display = 'none';
    $('#arabicLang')[0].style.display = 'flex';

});