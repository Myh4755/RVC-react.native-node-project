from flask import Flask, request, jsonify
from hf_rvc import RVCFeatureExtractor, RVCModel

app = Flask(__name__)

@app.route('/convert', methods=['POST'])
def convert_voice():
    data = request.json
    model_name = data['model_name']
    audio_array = data['audio_array']
    sampling_rate = data['sampling_rate']
    f0_up_key = data['f0_up_key']

    feature_extractor = RVCFeatureExtractor.from_pretrained(model_name)
    model = RVCModel.from_pretrained(model_name)

    input_features = feature_extractor(
        audio_array,
        sampling_rate=sampling_rate,
        f0_up_key=f0_up_key,
        return_tensors="pt",
    )
    output = model(**input_features).numpy()

    return jsonify({'converted_audio': output.tolist()})

if __name__ == '__main__':
    app.run(debug=True, port=5000)