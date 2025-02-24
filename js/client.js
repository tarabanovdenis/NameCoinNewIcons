document.addEventListener("DOMContentLoaded", function () {

    // check if form valid and enable button
    function checkFormErrorState(node) {
        const form = findAncestor(node,'.form');
        const formItemsWithError = document.querySelectorAll('.form__item.m-error');
        if (formItemsWithError.length === 0) {
            form.classList.remove('m-disabled');
        } else {
            form.classList.add('m-disabled');
        }
    }

    // hint
    const hintElement = document.querySelectorAll(".hint")
    hintElement.forEach(hintEl => {
        hintEl.addEventListener('click', function(event) {
            hintElement.forEach(hintEl => {
                hintEl.classList.remove('m-active');
            });
            hintEl.classList.add('m-active');
            event.stopPropagation();
        });
    });

    document.addEventListener('click', function() {
        hintElement.forEach(hintEl => {
            hintEl.classList.remove('m-active');
        });
    });

    // select
    document.querySelectorAll(".form__node select").forEach(selectElement => {
        const selectValue = selectElement.previousElementSibling;

        selectElement.addEventListener("change", function () {
            selectValue.textContent = this.options[this.selectedIndex].text;

            // change color of coin in form
            if (this.id === "coinColor") {
                const coinElement = document.querySelector("#stylingCoin");
                coinElement.className = "coin";
                if (this.value) coinElement.classList.add(this.value);
            }

            // show/hide form elements
            if (this.id === "coinStyle") {
                document.querySelectorAll("[data-form-group]").forEach(element => {
                    const groups = element.getAttribute("data-form-group").split(" ");
                    element.classList.toggle("m-active", groups.includes(this.value));
                });
            }
        });
    });

    // textarea autoheight
    const textarea = document.querySelector("textarea.form__node");
    if (textarea) {
        textarea.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        });
    }

    // enter coin symbol and emoji validation
    const coinSymbolInput = document.querySelector("#special-character-input");
    const coinEmoji = document.querySelector("#stylingCoin .coin__emoji");

    if (coinSymbolInput) {
        coinSymbolInput.addEventListener("input", function () {
            const emojiRegex = /[^a-zA-Z0-9]/;
            if (!emojiRegex.test(this.value)) {
                findAncestor(this, '.form__item').classList.add("m-error");
            } else {
                findAncestor(this, '.form__item').classList.remove("m-error");
                coinEmoji.textContent = this.value;
            }
            checkFormErrorState(coinIDInput);
        });

    }

    // ID's validation
    const coinIDInput = document.querySelector('input[name="coinID"]');
    if (coinIDInput) {
        coinIDInput.addEventListener('input', function() {
            const value = coinIDInput.value;
            if (value.length > 4) {
                findAncestor(this, '.form__item').classList.add("m-error");
            } else {
                findAncestor(this, '.form__item').classList.remove("m-error");
                coinIDInput.value = value.slice(0, 4)
            }
            checkFormErrorState(coinIDInput);
        });
    }

    const coinPictureInput = document.getElementById('coinPicture');
    const coinImage = document.querySelector('#stylingCoin .coin__pic');

    // update picture when chosen
    if (coinPictureInput) {
        coinPictureInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const imageURL = URL.createObjectURL(file);
                coinImage.src = imageURL;
            }
        });
    }


    // find ancestor function
    function findAncestor (el, sel) {
        while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,sel)));
        return el;
    }

    // copy to clipboard
    document.querySelectorAll(".js-copy-to-clipboard__btn").forEach(button => {
        button.addEventListener("click", function () {
            const codearea = this.closest(".js-copy-container").querySelector(".js-copy-to-clipboard__code");
            codearea.select();
            document.execCommand("copy");
            let value= this.innerHTML;
            this.innerHTML = 'Done';
            this.classList.add('m-disabled');
            setTimeout(() => {
                this.innerHTML = value;
                this.classList.remove('m-disabled');
            }, 1500);
        });
    });

});