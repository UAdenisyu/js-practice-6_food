function calc(){
    
    const d = document;
     //calculator

    const genderFields = d.querySelector('#gender').querySelectorAll('.calculating__choose-item'),
          constitutionFields = d.querySelector('.calculating__choose_medium').querySelectorAll('.calculating__choose-item'),
          activityFields = d.querySelector('.calculating__choose_big').querySelectorAll('.calculating__choose-item'),
          result = d.querySelector('.calculating__result').firstChild.nextSibling;

    class Calculator{
        constructor(gender, height, weight, age, activity){
            this.gender = gender;
            this.height = height;
            this.weight = weight;
            this.age = age;
            this.activity = activity;
            this.calculateCallories();
        }

        calculateCallories(){
            let res = 0;
            if (this.height && this.weight && this.age){
                if (this.gender == 'male'){
                    res = 88.36 + (13.4 * this.weight) + (4.8 * this.height) - (5.7 * this.age);
                }
                else if (this.gender == 'female'){
                    res = 447.6 + (9.2 * this.weight) + (3.1 * this.height) - (4.3 * this.age);
                }
                switch (this.activity){
                    case 'low': res *= 1.2; break;
                    case 'small': res *= 1.375; break;
                    case 'medium': res *= 1.55; break;
                    case 'high': res *= 1.725; break;
                }
            }
            result.textContent = `${Math.round(res)}`;
            return Math.round(res);
        }

        setActiveField(f){
            f.parentNode.querySelectorAll('div').forEach(field => {
                field.classList.remove('calculating__choose-item_active');
            });
            f.classList.add('calculating__choose-item_active');
        }

        setGender(g){
            this.gender = g.id;
            this.setActiveField(g);
            this.calculateCallories();
        }

        setActivity(a){
            this.activity = a.id;
            this.setActiveField(a);
            this.calculateCallories();
        }

        setParams([height, weight, age]){
            this.height = +height.value;
            this.weight = +weight.value;
            this.age = +age.value;
            this.calculateCallories();
        }
        
    }


    //устанавливаем начальные значения и настройки. Добавляем начальные классы активности.

    const calc = new Calculator('female', null, null, null, 'low');

    //навешиваем класс активности по клику. Обновляем текущие настройки.

    genderFields.forEach(field => {
        field.addEventListener('click', () => {
            calc.setGender(field);
        });
    });

    activityFields.forEach(field => {
        field.addEventListener('click', () => {
            calc.setActivity(field);
        });
    });

    constitutionFields.forEach(field => {
        field.addEventListener('input', () => {
            calc.setParams(constitutionFields);
        });
    });

}

module.exports = calc;