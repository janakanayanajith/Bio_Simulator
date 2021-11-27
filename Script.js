
            function chk() {
                var ifConnected = window.navigator.onLine;
                if (ifConnected) {
                    run();
                } else {
                    alert('Make sure you are connected to the internet');
                }
            }
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            google.charts.load('current', {'packages':['gauge']});
            //google.charts.setOnLoadCallback(drawChart);


            async function run() 
            {
                var options = {
                  width: 600, height: 200,
                  majorTicks: ['0','1','2','3','4','5','6','7','8','9','10'],
                  max:10
                };
                var x_chart = new google.visualization.Gauge(document.getElementById('x_div'));
                var y_chart = new google.visualization.Gauge(document.getElementById('s_div'));

            	var X=parseFloat(document.getElementById("Xi").value);

            	var Y=0.4;
            	var S=0;
            	var Km=1;
            	var n=4.12;

            	var time=0;
            	var xSeries = [];
                var pSeries = [];
                var sSeries = [];

                while(true)
                {
                    var h=parseFloat(document.getElementById("h").value);
                    var D = document.getElementById("D").value;
                    var pH = document.getElementById("pH").value;
                    var T = document.getElementById("T").value;
            	    var Si=parseFloat(document.getElementById("Si").value);

                    var mumax=-40.5+11.78*pH-0.0691*pH**2+1.65*T+0.003*T**2-0.468*pH*T;
                    var mu=mumax*S/(Km+S)
                    var r1=mu*X;
                    var dxdt=(mu-D)*X;
                    var dsdt=D*(Si-S)-(X/Y)*mu;

                    X=X+h*dxdt;
                    S=S+h*dsdt;
                    time=time+h;
                    console.log(h, X, S,dxdt, dsdt, mu, time);
                    document.getElementById("time").innerHTML=time;;
                    var x_data = google.visualization.arrayToDataTable([
                      ['Label', 'Value'],
                      ['Biomass (X)', X],
                    ]);
                    var s_data = google.visualization.arrayToDataTable([
                      ['Label', 'Value'],
                      ['Substrate (S)', S],
                    ]);
                    x_chart.draw(x_data, options);
                    y_chart.draw(s_data, options);
                    await sleep(50);

                }
            }
