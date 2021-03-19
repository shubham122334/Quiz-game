var ask=document.getElementById('ask');
var tt=document.getElementById('countdown');

//timer generated here
var time=new Date();
var i=setInterval(myTime,1000);

function myTime(){
    var t=time.getSeconds();
tt.innerText=t;
time.setSeconds(t-1);

//auto page move after 30s

    if(time.getSeconds()==59)
    {
        counter++;
        
    if(counter<5)
    {
        questionLoader();
    }
    else
    {
    clearInterval(i);
    alert("submit the test"+submit());

    }
}
if(t==10)
document.querySelector('.box').style.borderColor="red";

}
console.log(typeof (localStorage.getItem("file")));
//auto page move after 30s


//load question option variables

var opt1=document.getElementById('option1');
var opt2=document.getElementById('option2');
var opt3=document.getElementById('option3');
var opt4=document.getElementById('option4');
const sub=document.getElementById('submit');

const answer=document.getElementsByName('answer');



let counter=0;
let score=0;
let ans=null;

// load questionLoader

function questionLoader(){
    time.setSeconds(30);
    document.querySelector('.box').style.borderColor="#4CAF50";
    answer.forEach(ele=> ele.checked=false);
    
    var http=new XMLHttpRequest();
    http.open("GET",localStorage.getItem("file")+".json",true);
    http.send();
    http.onload=function(){
        if(this.status===200 && this.readyState == 4)
        {
            var st=JSON.parse(http.responseText);
            var tmp="";
            if(localStorage.getItem("file")==="easy")
            tmp=st.easy[counter];
            else if(localStorage.getItem("file")==="Md")
            tmp=st.Md[counter];
            else
            tmp=st.Hard[counter];

             ask.innerText=tmp['opt'];
            opt1.innerText=tmp['arr'][0];
            opt2.innerText=tmp['arr'][1];
            opt3.innerText=tmp['arr'][2];
            opt4.innerText=tmp['arr'][3];
            ans=tmp.ans;
        }
        else
        console.log("error");
    };
}

//next button listener 

sub.addEventListener('click',()=>{

    console.log(Answer());
    counter=counter+1;
    if(counter<5)
    {
        getAnswer();
    questionLoader();
    }
    else
    {
    sub.classList.add('d-none');
    getAnswer();
    clearInterval(i);
    showScore();
    }
    if(counter>3)
    {
        submit();
    }

});

function submit(){
    sub.classList.add('btn-danger');
    sub.innerHTML="Submit";
}


// checked-answer getter
function Answer(){
    let ans;
    answer.forEach((ele)=>{
        if(ele.checked)
        ans=ele.id;
    });
    return ans;
}

//comparing checked and database answer

function getAnswer(){
        let checkedAnwer=Answer();
        if(checkedAnwer===ans)
        score+=1;
}

questionLoader();

function showScore(){
var sc=document.getElementById('score');
    sc.style.display='flex';
    sc.innerHTML=`<p>your score is ${score}/5 
    <br><button class="row btn btn-primary mt-2" onclick="location.href='index.html';">play Again</button>`;

}