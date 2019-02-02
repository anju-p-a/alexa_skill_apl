// TODO: change this so that we can have separate JS files build into this file

const TENANT_TEST_ENABLED_COOKIE = "tenantTestEnabled";
const TENANT_TEST_HOST_OVERRIDE_COOKIE = "tenantTestHostOverride";
const TENANT_TEST_HOST_PORT_OVERRIDE_COOKIE = "tenantTestHostPortOverride";
const TENANT_TEST_URI_OVERRIDE_COOKIE = "tenantTestUriOverride";
const TENANT_TEST_HOST_SOCKET_TIMEOUT_OVERRIDE_COOKIE = "tenantTestSocketTimeoutOverride";
const TENANT_TEST_HOST_REGEX = /.+\.amazon\.com/g;

$(document).ready(function () {
    let $searchButtonAnchor = $('#dpcHeaderSearchButtonAnchor');

    $('.dpcHeaderButton.dpcHeaderSearchButton').click(function() {
        $(this).addClass('d-none');
        $searchButtonAnchor.addClass('d-none');
        handleSearchExpanse();
        $('#dpcSearchForm').removeClass('d-none');
        $('.dpcSearchField').focus();
    });

    let $searchForm = $('#dpcSearchForm');

    $searchForm.submit(function(e) {
        if( $("input:first").val() === "") {
            e.preventDefault();
            return;
        }

        $searchForm.addClass('d-none');
        $('.dpcHeaderButton.dpcHeaderSearchButton').removeClass('d-none');
        $searchButtonAnchor.removeClass('d-none');
    });

    $searchForm.focusout(function() {
        timeout = setTimeout(function() {
            $searchForm.addClass('d-none');
            $('.dpcHeaderButton.dpcHeaderSearchButton').removeClass('d-none');
            $searchButtonAnchor.removeClass('d-none');
            handleSearchExpanse();
        }, 200);
    });
});

function handleSearchExpanse() {
    let media = window.matchMedia("(max-width: 625px)");

    if (media.matches) {
        $('#dpc-header-logo').toggleClass('d-none');
    }
}

$(function () {
    $('[data-toggle="popover"]').popover()
});

$('#support-popover')
    .popover({trigger:'manual',
        animation: false,
        placement:'bottom',
        html:true,
        container:'body',
        content:function(){return $('#support-popover-content').html()},
        template: '<div class="popover dpc-header-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }).click(function (){
        let _this = this;
        $(this).popover("show");
        $(this).addClass("dpcHeaderButtonHover");
        $(".popover").on("mouseleave", function () {
            setTimeout(function () {
                $(_this).removeClass("dpcHeaderButtonHover");
                $(_this).popover('hide');
            }, 100);
        })
    }).on("mouseleave", function () {
            let _this = this;
            setTimeout(function () {
                if (!$(".popover:hover").length) {
                    $(_this).popover("hide");
                    $(_this).removeClass("dpcHeaderButtonHover");
                }
            }, 400);
});

$('#account-preferences-menu')
    .popover({trigger:'manual',
        animation: false,
        placement:'bottom',
        html:true,
        content:function(){return $('#user-pref-popover-content').html()},
        template: '<div class="popover dpc-header-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }).click(function (){
            let _this = this;
            $(this).popover("show");
            $(this).addClass("dpcHeaderButtonHover");
            $(".popover").on("mouseleave", function () {
                    setTimeout(function () {
                        $(_this).removeClass("dpcHeaderButtonHover");
                        $(_this).popover('hide');
                    }, 100);
            });
    }).on("mouseleave", function () {
        let _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).removeClass("dpcHeaderButtonHover");
                $(_this).popover("hide");
            }
        }, 400);
});

function updateLocale(locale) {
    $.post('/alexa/console/local/updatePortalLanguage/' + locale, function(){
        location.reload();
    });
}

function submitTenantTestForm(uri, host, port, timeout) {
    if (!host.match(TENANT_TEST_HOST_REGEX)) {
        alert("Override host must end in \"*.amazon.com\"");
        return;
    }

    createCookie(TENANT_TEST_ENABLED_COOKIE, true, 1);
    createCookie(TENANT_TEST_URI_OVERRIDE_COOKIE, uri, 1);
    createCookie(TENANT_TEST_HOST_OVERRIDE_COOKIE, host, 1);
    createCookie(TENANT_TEST_HOST_PORT_OVERRIDE_COOKIE, port, 1);
    createCookie(TENANT_TEST_HOST_SOCKET_TIMEOUT_OVERRIDE_COOKIE, timeout, 1);

    alert("Override saved successfully.");
    location.replace(uri)
}

function clearTenantTestFormCookies() {
    eraseCookie(TENANT_TEST_ENABLED_COOKIE);
    eraseCookie(TENANT_TEST_URI_OVERRIDE_COOKIE);
    eraseCookie(TENANT_TEST_HOST_OVERRIDE_COOKIE);
    eraseCookie(TENANT_TEST_HOST_PORT_OVERRIDE_COOKIE);
    eraseCookie(TENANT_TEST_HOST_SOCKET_TIMEOUT_OVERRIDE_COOKIE);

    alert("Cookies cleared successfully.");
    location.reload();
}

function createCookie(name, value, days) {
    let expires;
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
