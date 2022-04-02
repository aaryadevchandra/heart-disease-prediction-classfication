from flask import Flask
from flask_restful import Api, Resource
import pickle
from flask_cors import CORS
import pandas as pd
import base64
import json

app = Flask(__name__)
api = Api(app)
CORS(app)


def predict(age, sex, thalachh,  chol, fbs, exng, cp, restecg, oldpeak, caa, thall, trtbps, slp):

    if fbs == '> 120 (mg/dl)':
        fbs = 1
    else:
        fbs = 0

    if sex == 'Female':
        sex = 0

    elif sex == 'Male':
        sex = 1

    if exng == 'Yes':
        exng = 1

    elif exng == 'No':
        exng = 0

    if thall == 'Normal blood flow':
        thall = 2

    elif thall == "Defect exists, can't be fixed":
        thall = 1

    elif thall == "Defect exists, can be fixed":
        thall = 3

    variables = ["age", "sex", "cp", "trtbps", "chol", "fbs",
                 "restecg", "thalachh", "exng", "oldpeak", "slp", "caa", "thall"]
    new = pd.DataFrame(columns=variables)
    try:
        new.loc[0] = [float(age)/77, float(sex), float(cp), float(trtbps)/200, float(chol)/564, float(fbs), float(
            restecg), float(thalachh)/202, float(exng), float(oldpeak), float(slp), float(caa), float(thall)]
    except:
        return {'Error': 'Issues in data'}
    # New is a dataframe with 13 values

    # running logistic regression model
    with open("../MLmodels/LogiReg.pkl", "rb") as fp:
        logi_regression_model = pickle.load(fp)

    # get logistic regression ans
    logi_regression_ans = logi_regression_model.predict(new)

    # running svm model
    with open("../MLmodels/svm_model.pkl", "rb") as fp:
        svm_model = pickle.load(fp)

    # get svm ans
    svm_ans = svm_model.predict(new)

    # running random forest model
    with open("../MLmodels/random_forest_model.pkl", "rb") as fp:
        random_forest_model = pickle.load(fp)

    # get random forest ans
    random_forest_ans = random_forest_model.predict(new)

    # creating a dictionary with one and zero as the keys
    # the key with the maximum value will be our final outcome/output/result of our prediction
    final_pre_dict = {'one': 0, 'zero': 0}

    # for each ans that we received, if the respective model ans == 1, add ++1 to value of key -> 'one'
    # if model ans == 0, add ++1 to value of key -> 'zero'
    # basically finding how many ones or zeros we got
    for model_ans in [logi_regression_ans[0], svm_ans[0], random_forest_ans[0]]:
        if model_ans == 1:
            final_pre_dict['one'] += 1
        else:
            final_pre_dict['zero'] += 1

    # if more ones than zeros, return 1, else vice versa
    if final_pre_dict['one'] > final_pre_dict['zero']:
        print('Low to no probability of heart disease')

        return 0
    else:
        print('High probability of heart disease')
        return 1


class HeartAPI(Resource):
    def post(self, userMedDetailsJSONStringB64):
        userMedDetailsJSONString = base64.b64decode(
            userMedDetailsJSONStringB64.encode('ascii')).decode('ascii')
        userMedDetailsJSON = json.loads(userMedDetailsJSONString)
        print(userMedDetailsJSON)

        # calling the model predict function and passing our received params
        final_prediction = predict(userMedDetailsJSON['age'], userMedDetailsJSON['sex'], userMedDetailsJSON['maxhrtrate'], userMedDetailsJSON['chol'], userMedDetailsJSON['fstbloodsugar'], userMedDetailsJSON['angina'], userMedDetailsJSON['chestpain'], userMedDetailsJSON['restecg'], userMedDetailsJSON['oldpeak'], userMedDetailsJSON['mjrvessel'],
                                   userMedDetailsJSON['thalas'], userMedDetailsJSON['restbp'], userMedDetailsJSON['slope'])

        print('returning from final prediction function')
        return final_prediction


api.add_resource(HeartAPI, "/heartapi/<string:userMedDetailsJSONStringB64>")

if __name__ == "__main__":
    app.run(debug=True)
