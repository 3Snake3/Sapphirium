const stringKey = "korium-user-agreement-version";
const version = 0;

let changelogText = " [grey]1. [accent]ОБЩИЕ УСЛОВИЯ\n\n [grey]ты пришёл сюда не читать, так ведь, а играть? А читать прийдётся))) \n\n\n 2. [accent]УСЛОВИЯ ИСПОЛЬЗОВАНИЯ\n\n [grey]Пользуясь модификацией 'Korium Mod' вы потверждаете, что вы: \n АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА АБОБА\n\n\n 7. [accent]ЛИЦЕНЗИЯ\n\n [grey]Нета(кто?)"
function showDialog(firstRun) {
    var dontShowAgain = false;
    var agree = false;

    var dialog = new BaseDialog( "@user-agreement");

    dialog.buttons.defaults().size(210, 64);
    dialog.buttons.add((() => {
        var box = new CheckBox("@agreement");
        box.update( run(() => {
            box.setChecked( agree );
        }));
        box.changed(run(() => {
                dontShowAgain = !dontShowAgain;
	        agree = !agree;
        }));
        box.left();
        return box;
    })());
    dialog.buttons.row();
    dialog.buttons.button("@close", run(() => {
        if(agree) dialog.hide();
        /*if (dontShowAgain) {
            Core.settings.put( stringKey, version )
        }*/
    })).size(210, 64);

    dialog.cont.pane((() => {

        var table = new Table();
        if (firstRun) {
            table.add("@agreement-welcome")
                .left().growX().wrap().width(700).maxWidth(700).pad(4).labelAlign(Align.left);
            table.row();
        }

        //table.image().color(Color.valueOf("69dcee")).fillX().height(3).pad(3);
        table.row();
        table.add("Версия соглашения: " + version)
            .left().growX().wrap().width(700).maxWidth(700).pad(4).labelAlign(Align.left);
        table.row();
        //table.image().color(Color.valueOf("69dcee")).fillX().height(3).pad(3);
        table.row();

        table.add(changelogText)
            .left().growX().wrap().width(700).pad(4).labelAlign(Align.left);
        table.row();
        return table;
    })()).grow().center().maxWidth(700);

    dialog.show();
}

Events.run(ClientLoadEvent, run(() => {
    const saveVer = 0//Core.settings.getString( stringKey, null )

    if (false) {
        showDialog();
        return;
    }
    if (version != saveVer) {
        showDialog(saveVer == null);
    }
}));
