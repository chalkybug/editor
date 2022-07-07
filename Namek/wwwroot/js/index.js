
window.addEventListener('load', function () {
    var mycolor = 'black';
    var myEndPlug = 'behind';
    var grid = 'grid';
    var size = 2;
    var startSocketGravity = 500;

    var line1_2 = new LeaderLine(
        document.getElementById('t1'),
        document.getElementById('t2')
    );
    line1_2.color = mycolor;
    line1_2.endPlug = myEndPlug;
    line1_2.size = size;

    var line2_3 = new LeaderLine(
        document.getElementById('t2'),
        document.getElementById('t3')
    );
    line2_3.color = mycolor;
    line2_3.endPlug = myEndPlug;
    line2_3.path = grid;
    line2_3.size = size;

    var line2_4 = new LeaderLine(
        document.getElementById('t2'),
        document.getElementById('t4')
    );
    line2_4.color = mycolor;
    line2_4.endPlug = myEndPlug;
    line2_4.path = grid;
    line2_4.size = size;


    var line2_6 = new LeaderLine(
        document.getElementById('t2'),
        document.getElementById('t6')
    );
    line2_6.color = mycolor;
    line2_6.endPlug = myEndPlug;
    line2_6.path = grid;
    line2_6.startSocketGravity = startSocketGravity;
    line2_6.size = size;

    var line4_7 = new LeaderLine(
        document.getElementById('t4'),
        document.getElementById('t7')
    );
    line4_7.color = mycolor;
    line4_7.endPlug = myEndPlug;
    line4_7.path = grid;
    line4_7.size = size;

    var line4_5 = new LeaderLine(
        document.getElementById('t4'),
        document.getElementById('t5')
    );
    line4_5.color = mycolor;
    line4_5.endPlug = myEndPlug;
    line4_5.path = grid;
    line4_5.setOptions({ startSocket: 'top', endSocket: 'top' });
    line4_5.size = size;

    var line5_8 = new LeaderLine(
        document.getElementById('t5'),
        document.getElementById('t8')
    );
    line5_8.color = mycolor;
    line5_8.endPlug = myEndPlug;
    line5_8.size = size;
    line5_8.path = grid;
    line5_8.setOptions({ startSocket: 'bottom', endSocket: 'top' });

    var line2_9 = new LeaderLine(
        document.getElementById('t2'),
        document.getElementById('t9')
    );
    line2_9.color = mycolor;
    line2_9.endPlug = myEndPlug;
    line2_9.path = grid;
    line2_9.startSocketGravity = startSocketGravity;
    line2_9.size = size;

    var line2_10 = new LeaderLine(
        document.getElementById('t2'),
        document.getElementById('t10')
    );
    line2_10.color = mycolor;
    line2_10.endPlug = myEndPlug;
    line2_10.path = grid;
    line2_10.startSocketGravity = startSocketGravity;
    line2_10.size = size;

    var line11_12 = new LeaderLine(
        document.getElementById('t11'),
        document.getElementById('t12')
    );
    line11_12.color = mycolor;
    line11_12.endPlug = myEndPlug;
    line11_12.size = size;
    line11_12.path = grid;
});