# Dense EfficientNet with Grad-CAM Interpretability for Resource-Constrained Brain Tumor MRI Classification

**Authors**: MD Kawser Islam, Shamin Yeaser Shams, MD. Ismail Hossain*  
**Affiliation**: Department of Electrical and Computer Engineering, North South University, Dhaka, Bangladesh  
**Supervisor**: Dr. Mohammad Monirujjaman Khan, Associate Professor, ECE Department, North South University  
**Corresponding Contact (MD. Ismail Hossain)**: [ismailhossain013@gmail.com](mailto:ismailhossain013@gmail.com) | [Portfolio](https://smile-plzz.github.io/Ismail_Hossain/) | [GitHub](https://github.com/smile-plzz) | [LinkedIn](https://www.linkedin.com/in/md-ismail-hossain-2938541b1/) | [Facebook](https://www.facebook.com/optimisticyetpessimist/)

---

## Abstract (EN)

Reliable classification of brain tumor subtypes from magnetic resonance imaging (MRI) supports faster diagnostic workflows, but many high-accuracy deep learning models assume compute budgets unavailable in resource-constrained clinical settings, and few pair their predictions with region-level explanations a radiologist can audit. We revisit a dense-layer-augmented EfficientNetB0 architecture for four-class brain tumor classification (glioma, meningioma, pituitary tumor, no tumor) on a 3,260-image T1-weighted contrast-enhanced MRI corpus, trained on a single consumer-grade GPU (NVIDIA GTX 1050, 8 GB), and pair it with Grad-CAM activation mapping for prediction-level interpretability. We compare the dense EfficientNet against a ResNet-50 baseline trained under identical preprocessing (min-max normalization, rotation/shift/zoom augmentation). The dense EfficientNet reaches 99.97% training accuracy and correctly classifies 322 of 326 held-out test images (98.77% test accuracy), against the ResNet-50 baseline's 314 of 326 (96.32%) — a directional comparison we do not treat as statistically established, since the baseline's nonstandard sigmoid output configuration and the absence of a significance test both limit what can be concluded from the gap. As a measurable resource-efficiency indicator, the dense EfficientNet uses an estimated 6.67M trainable parameters against ResNet-50's 23.5M, an approximately 3.5× reduction. Grad-CAM maps for correctly classified cases concentrate on tumor-proximal regions rather than background tissue, offering a qualitative interpretability check alongside the quantitative result. We position this result not as a state-of-the-art accuracy claim — 2024-2026 EfficientNet-variant and hybrid CNN-Transformer studies on comparable corpora now report 99%+ accuracy — but as a partially-substantiated case, on parameter-count grounds, for the dense-EfficientNet design's continued relevance in interpretable, lower-resource settings; we did not measure inference-time or deployment-memory footprint, so we stop short of a full resource-efficiency claim. We report the accuracy figures as originally measured during the 2023 project and disclose that no independent retraining was performed for this revision; the figures are therefore inherited, not re-verified.

**Keywords**: brain tumor classification, EfficientNet, Grad-CAM, magnetic resonance imaging, explainable AI, resource-constrained deep learning

## 摘要 (zh-TW)

從磁振造影（MRI）準確分類腦腫瘤亞型有助於加速診斷流程，但許多高準確率的深度學習模型假設臨床資源受限環境中未必具備的運算資源，且鮮少將預測結果與可供放射科醫師檢視的區域級解釋相結合。本研究重新檢視一個以密集層（dense layer）強化之 EfficientNetB0 架構，應用於四類腦腫瘤分類任務（膠質瘤、腦膜瘤、垂體腫瘤、無腫瘤），使用 3,260 張 T1 加權對比增強 MRI 影像，並於單一消費級 GPU（NVIDIA GTX 1050、8GB）上訓練，同時搭配 Grad-CAM 活化映射以提供預測層級的可解釋性。我們將密集 EfficientNet 與在相同前處理（最小-最大正規化、旋轉/平移/縮放資料增強）下訓練的 ResNet-50 基準模型進行比較。密集 EfficientNet 達到 99.97% 訓練準確率，並在 326 張保留測試影像中正確分類 322 張（測試準確率 98.77%），相對於同一協定下 ResNet-50 基準的 314/326（96.32%）——惟此為方向性比較而非統計顯著性結果，因基準模型採用非標準的 sigmoid 輸出設定，且未進行顯著性檢定。就可測量的資源效率指標而言，密集 EfficientNet 估計使用約 667 萬個可訓練參數，相較 ResNet-50 的 2,353 萬個，約減少 3.5 倍。針對正確分類案例的 Grad-CAM 熱區圖集中於腫瘤鄰近區域而非背景組織，提供了與量化結果並行的質性可解釋性檢驗。本文並非主張此為目前最高準確率——2024 至 2026 年間之 EfficientNet 變體與混合 CNN-Transformer 研究於可比較資料集上已可達到 99% 以上準確率——而是就參數量而言，為密集 EfficientNet 設計在低資源、可解釋場域中的持續適用性，提出部分佐證；由於本研究並未測量推論時間或部署記憶體用量，故不主張完整的資源效率宣稱。本文所報告之準確率數據為 2023 年原始專案量測所得，本次修訂並未重新訓練模型獨立驗證；該數據為沿用而非重新驗證之結果，特此揭露。

**關鍵詞**：腦腫瘤分類、EfficientNet、Grad-CAM、磁振造影、可解釋人工智慧、資源受限深度學習

---

## 1. Introduction

Brain tumors account for a disproportionate share of cancer-related mortality relative to their incidence, in part because tumor heterogeneity makes manual radiological classification slow and dependent on specialist availability [1], [2]. Convolutional neural networks (CNNs) have become the dominant tool for automating tumor-type classification from MRI, and architectures built on EfficientNet [3] have repeatedly demonstrated strong accuracy-to-parameter-count trade-offs on medical imaging tasks. Two practical gaps persist in the literature this work targets: first, most published pipelines report accuracy without reporting the hardware budget the accuracy was obtained on, which matters directly for adoption in lower-resource clinical settings; second, a model's classification decision is only clinically useful if a radiologist can sanity-check which image regions drove it, which is where gradient-based visualization methods such as Grad-CAM [4] contribute.

This paper re-examines a dense-layer-augmented EfficientNetB0 classifier, originally developed as a 2023 undergraduate thesis project at North South University, for four-class brain tumor classification: glioma, meningioma, pituitary tumor, and no tumor. Three elements distinguish the framing of this revision from the original project and from a large share of the 2022-2026 literature reviewed in Section 2. First, we report the training hardware explicitly (a single NVIDIA GTX 1050 with 8 GB VRAM) and treat compute-efficiency, not raw accuracy, as the primary contribution, since accuracy in the high-90s-to-100% range is now common across the field. Second, we pair the classifier's predictions with Grad-CAM visualizations and inspect them qualitatively against the tumor regions the images actually contain, rather than treating Grad-CAM as a novelty add-on. Third, we disclose explicitly which quantitative results in this paper come from the original 2023 experiments (not independently reproduced for this revision) versus new material added in this revision (the updated literature comparison and the corrected internal-consistency check on the original results, detailed in Section 4).

The remainder of this paper is organized as follows. Section 2 reviews prior CNN- and Transformer-based brain tumor classification work, with emphasis on 2022-2026 publications that establish the current accuracy and interpretability baseline. Section 3 describes the dataset, preprocessing pipeline, and the dense EfficientNet and ResNet-50 architectures compared in this study. Section 4 reports classification results, a corrected confusion-matrix-based accuracy figure, and the Grad-CAM interpretability analysis. Section 5 discusses limitations, including the absence of an independent retraining pass for this revision. Section 6 concludes.

## 2. Related Work

### 2.1 CNN-based brain tumor classification (2019-2023 baseline)

Early CNN approaches to brain tumor classification established the dataset and preprocessing conventions this paper follows. Cheng et al. [5] used the 3,064-image T1-weighted contrast-enhanced figshare corpus that underlies the larger dataset used here, applying image dilation to expand the tumor region prior to sub-region partitioning. Badža and Barjaktarović [6] fine-tuned a pretrained CNN on the same image family, reporting 96.56% accuracy under 10-fold cross-validation. Díaz-Pernas et al. [7] achieved 97% accuracy on 3,064 slices from 233 patients using a multiscale CNN, and Das et al. [8] reported 94% accuracy on the same corpus with a convolutional network trained from a comparatively simple architecture. Abd El Kader et al. [9] scaled to 25,000 MRI images with a differential deep CNN, reporting 99.25% training accuracy. Across this body of work, accuracy in the 94-99% range on 3,000-25,000-image T1-weighted corpora was the established norm by 2021.

### 2.2 EfficientNet variants (2023-2025)

More recent work has moved specifically toward EfficientNet-family backbones. Zulfiqar et al. [10] fine-tuned EfficientNetB0-B4 variants on the same figshare-derived CE-MRI corpus family for a *three*-class task (glioma, meningioma, pituitary tumor — no "no-tumor" class), reporting EfficientNetB3 reaching 99% test accuracy with 99% macro-averaged F1; we note the class-count difference from the present study's four-class task explicitly, since three-class and four-class accuracy figures are not directly comparable: a three-class classifier presupposes a tumor is already present and only discriminates its type, a materially easier task than the four-class screening problem (which must also separate tumor from no-tumor cases) addressed in this paper. Ishaq et al. [11] modified an EfficientNet architecture for four-class classification (glioma, meningioma, pituitary tumor, non-tumor) with an integrated Grad-CAM component, reporting 99.39% accuracy as the best accuracy-versus-compute trade-off among the variants tested. These results establish that the accuracy ceiling for EfficientNet-based four-class MRI classification has moved past what the present study's original 2023 measurements report, which is the basis for this paper's decision not to frame its contribution around raw accuracy (Section 1).

### 2.3 Explainability methods (2024-2025)

Grad-CAM has shifted from a novelty feature to an expected baseline component in recent brain tumor classification papers, with 2024-2025 work increasingly comparing Grad-CAM against alternative explanation methods rather than reporting it alone. Musthafa et al. [12] combined Grad-CAM with ResNet-50, reporting 98.52% test accuracy and explicitly correlating activation regions with radiological markers such as temporal lobe atrophy. Gharaibeh [13] paired Grad-CAM with SHAP on an Xception backbone to cross-check explanation agreement between gradient-based and game-theoretic attribution methods on the same four-class task used here. Yoon and Lin [14] directly compared LIME and Grad-CAM explanations across VGG16, ResNet-50, and EfficientNetB0, finding VGG16 and ResNet-50 exceeded 98% accuracy while EfficientNetB0 reached 96% in their reproduction setting — a reminder that EfficientNet's advantage over other backbones is not universal across studies. Relative to this literature, a Grad-CAM-only interpretability analysis — the approach retained in this paper, consistent with the original 2023 project scope — is now a baseline-level contribution rather than a distinguishing one; we state this explicitly rather than overclaim novelty for the explainability component.

### 2.4 Vision Transformer and hybrid architectures (2025)

Vision Transformers (ViTs) and hybrid CNN-Transformer models have entered the comparison landscape since 2023. Attallah and Pacal [15] benchmarked 20 lightweight CNN and 18 ViT architectures (38 total) across a merged corpus of 17,933 MRI images spanning the same four classes used here, finding EfficientNet-B0 (98.36% accuracy, 4.01M parameters) and Tiny-ViT-5M (98.41% accuracy, 5.07M parameters) as the top performer in each architecture family — directly relevant to the resource-efficiency framing of this paper, since both figures were achieved with parameter counts an order of magnitude below typical ResNet-50-class models. Thottempudi et al. [16] proposed a hybrid CNN-Transformer model incorporating Aquila Optimization, reporting 97.2% accuracy while explicitly retaining interpretability, outperforming CNN-only and ViT-only baselines on the same task. A ViT-B/16-based classification approach has also been reported [17]; we were unable to independently confirm a specific accuracy figure for this architecture beyond what a single search pass surfaced, and treat any such figure as provisional rather than an established benchmark pending direct primary-source confirmation.

### 2.5 Positioning

Taken together, Sections 2.1-2.4 show that the field has moved from establishing baseline CNN feasibility (2019-2021) to competing on marginal accuracy gains among near-ceiling architectures (2023-2025) to treating multi-method explainability and compute efficiency as the more differentiating axes (2024-2026). This paper's contribution is accordingly scoped to the compute-efficiency and single-method-interpretability niche: a fully specified, low-VRAM training recipe with Grad-CAM verification, evaluated honestly against a ResNet-50 baseline under matched conditions, rather than a claim of state-of-the-art accuracy.

## 3. Methodology

### 3.1 Dataset

The dataset consists of 3,260 T1-weighted contrast-enhanced brain MRI images spanning four classes: glioma (926 images), meningioma (937 images), pituitary tumor (901 images), and no tumor (the remainder of the corpus), assembled from 233 patients imaged across sagittal (1,025 images), axial (994 images), and coronal (1,045 images) planes, sourced from the Kaggle Brain Tumor MRI Dataset, itself built on the figshare corpus of Cheng [18]. The corpus was split 80% training and 20% combined validation/testing, with 326 images held out for final testing.

### 3.2 Preprocessing

Images were normalized using min-max normalization to enhance tumor-region contrast:

$$r = \frac{d - mn}{mx - mn}$$

where *d* is the input pixel value, *mn* and *mx* are the minimum and maximum pixel values in the image, and *r* is the normalized output in the range [0, 1], following the fuzzification-based normalization approach of Nayak et al. [19] (2020). We note this preprocessing citation was not updated during the Stage 1 literature pass, which focused on classification-architecture and interpretability literature; a 2022-2026 search specifically for MRI preprocessing/normalization methods was out of scope for this revision and remains a gap. Images were resized to a consistent input resolution (150×150 for the EfficientNet pipeline; 224×224 for the ResNet-50 pipeline, matching each architecture's native input expectations) and cropped to remove non-informative border regions. Data augmentation — rotation, width/height shift, and zoom — was applied to the training split only, to reduce overfitting given the dataset's limited size relative to typical deep CNN training corpora.

### 3.3 Dense EfficientNet architecture

The classification backbone is EfficientNetB0 (pretrained on ImageNet, 7 MBConv blocks), extended with a global average pooling layer followed by four dense layers (720, 360, 360, and 180 units respectively) interleaved with three dropout layers (rates 0.25, 0.25, and 0.5) to control overfitting on the limited training corpus, and a final four-unit dense layer with softmax activation producing per-class probabilities. This dense-layer extension is the architectural contribution retained from the original 2023 project; the implementation is available in the accompanying code repository (`src/model.py`).

### 3.4 ResNet-50 baseline

As a comparison baseline, we trained a ResNet-50 [20] model, using the standard bottleneck residual block design (identity shortcuts where input/output dimensions match; 1×1 convolutional projection shortcuts otherwise) with a final fully connected softmax layer replacing the original 1,000-class ImageNet head. The model was trained with stochastic gradient descent (SGD) and a sigmoid activation on the penultimate layer, matching the original project's configuration. **This is a nonstandard choice for multi-class classification — sigmoid activation treats each class independently rather than producing a normalized joint probability distribution, which can bias reported accuracy relative to a correctly configured softmax baseline. This is a validity threat to the head-to-head comparison in Section 4.1, not merely a background implementation detail: the reported accuracy gap between the two models (Section 4.1) may partly reflect this activation-function asymmetry rather than a genuine architectural advantage of the dense EfficientNet. We were unable to retrain a corrected softmax version of ResNet-50 for this revision (Section 5) and flag the comparison as directional, not conclusive.**

### 3.5 Parameter-count comparison

As a resource-efficiency measurement computable without retraining, we compare trainable parameter counts. EfficientNetB0's standard 1,280-dimensional global-average-pooling output, combined with the dense head described in Section 3.3 (720+360+360+180+4 units), adds approximately 1.38M trainable parameters on top of EfficientNetB0's base parameter count (approximately 5.29M, the widely reported figure for the ImageNet-pretrained backbone including its native top layer), for an estimated total of **approximately 6.67M trainable parameters**. The ResNet-50 baseline (Section 3.4) has a reported 23,534,592 trainable parameters — an approximately **3.5× reduction** for the dense EfficientNet. We report this as an architecture-level estimate, not a measured runtime figure, and it does not by itself establish inference-time latency or memory advantages, which we were unable to measure in this revision (Section 5).

### 3.6 Training configuration

Both models were trained for 15 epochs with batch size 32 on a single NVIDIA GTX 1050 GPU (8 GB VRAM), an Intel Core i5 (10th generation) CPU, and 16 GB system RAM — hardware substantially below what most comparable studies in Section 2 report, and the basis for this paper's resource-efficiency framing.

### 3.7 Grad-CAM interpretability

Grad-CAM [4] was applied to the trained dense EfficientNet to visualize which image regions contributed most to each classification decision. Grad-CAM computes the gradient of the target class score with respect to the feature maps of the final convolutional layer, global-average-pools these gradients to obtain per-channel importance weights $\alpha_k^c$, and combines the weighted feature maps through a ReLU to produce a class-discriminative localization map:

$$L^c_{\text{Grad-CAM}} = \text{ReLU}\left(\sum_k \alpha_k^c A^k\right)$$

The ReLU restricts the map to regions with a positive influence on the target class, following the original Grad-CAM formulation [4]. The implementation is provided in `src/gradcam.py` of the accompanying repository.

## 4. Results and Discussion

### 4.1 Corrected accuracy reporting

The original 2023 thesis report contained four internally inconsistent accuracy/loss figures for the dense EfficientNet model across its Abstract, Results, and comparison-table sections (99.96%/100%, 99.97%/98.78%, 96%/0.0596 loss, and 100%/98.75%/98.75% precision-recall-F1). We resolve this inconsistency for the present paper using the only figure in the original report backed by a concrete, independently checkable count: the confusion matrix description, which states 4 of 326 test images were misclassified by the dense EfficientNet model and 12 of 326 by the ResNet-50 model. This yields:

- **Dense EfficientNet**: 322/326 correct = **98.77% test accuracy**
- **ResNet-50**: 314/326 correct = **96.32% test accuracy**

Training accuracy is reported as **99.97%**, the figure appearing consistently (within rounding) across the Abstract (99.96%) and Results narrative (99.97%) of the original report. We treat the abstract's unsupported claim of "100% test accuracy" as an error superseded by the confusion-matrix-derived figure above, and the "0.0596 test loss" / "98.75% precision-recall-F1" figures as consistent with, and retained alongside, the corrected 98.77% accuracy. Table 1 summarizes the corrected comparison.

**Table 1. Corrected performance comparison (test set, n=326).**

| Model | Train Acc. | Test Acc. (corrected) | Misclassified | Test Loss |
|---|---|---|---|---|
| Dense EfficientNet (this work) | 99.97% | 98.77% | 4/326 | 0.0596 |
| ResNet-50 baseline | — | 96.32% | 12/326 | — |

**Statistical caveat**: with n=326 and only 4-12 misclassifications, this comparison was not evaluated with a formal significance test (e.g., McNemar's test on paired predictions) in the original 2023 project, and per-image prediction records were not available in machine-readable form for this revision to compute one retroactively. Combined with the ResNet-50 sigmoid/softmax configuration issue noted in Section 3.4, we describe the 98.77%-vs-96.32% gap as a directional observation from the original experiment, not a statistically established or activation-function-controlled result.

### 4.2 Class-specific performance

Consistent with the original report, all models classified pituitary tumor cases most reliably, and the majority of misclassifications across both models fell in the glioma class, which the original report attributes to lower inter-class visual separability between glioma and meningioma presentations in this dataset. We did not have access to the original per-class precision/recall/F1 table's underlying computation to independently re-derive class-level figures beyond the aggregate confusion-matrix counts in Section 4.1, and we flag this as a specific verification gap rather than restate unverified per-class numbers (see Section 5).

### 4.3 Grad-CAM interpretability analysis

Grad-CAM heatmaps generated for correctly classified test images concentrate activation in tumor-proximal regions — consistent with the qualitative pattern reported by Selvaraju et al. [4] and with the region-correlation approach of more recent work such as [12] — rather than diffusing activation across background or non-diagnostic tissue. This supports, at a qualitative level, that the dense EfficientNet's classification decisions are driven by tumor-relevant image content rather than incidental correlates (e.g., scan orientation or acquisition artifacts). We note this analysis is qualitative; a quantitative interpretability metric (e.g., activation-region overlap with radiologist-annotated tumor masks, as in [12]) was outside the scope of the original 2023 project and remains a natural extension (Section 5).

### 4.4 Comparison against 2024-2026 literature

Positioned against the 2022-2026 literature reviewed in Section 2, the corrected 98.77% test accuracy reported here trails the 99%+ figures reported by [10] (three-class task) and [11] (four-class, 99.39%), and sits close to but below the 98.36-98.41% range reported by the large parameter-efficient benchmark [15] and the 98.52% reported by [12]. None of [10], [11], [12], or [15] disclose training hardware as constrained as the single 8 GB consumer GPU used in this study, though we note this is an inference from omission, not a confirmed comparison — hardware specifications were not reported in the search-surfaced abstracts/summaries for these sources and would need primary-source confirmation to state as fact. We view the primary contribution of this work as a documented, corrected re-analysis with a matched-baseline comparison, an architecture-level parameter-efficiency measurement (Section 3.5: ~6.67M vs. ResNet-50's 23.5M trainable parameters, an approximately 3.5× reduction), and interpretability verification — not as a state-of-the-art accuracy claim, and not, on its own, as a validated resource-efficiency contribution in the deployment sense. We deliberately scope the claim this way: the parameter-count difference is real and measurable without retraining, but we did not measure inference latency or memory footprint, and the training hardware used (a 2016-era 8GB consumer GPU) reflects what was available to the original 2023 project rather than a deliberately designed low-resource benchmark. A reader should treat "resource-efficient" as a property partially supported by architecture-level evidence (parameter count) and partially as unmeasured context (training hardware), not as a fully substantiated deployment claim.

## 5. Limitations

This revision inherits several limitations from the original 2023 project and introduces one specific to the revision process itself:

1. **No independent retraining.** All quantitative results in Section 4 are inherited from the original 2023 experiments; no fresh training run was performed for this revision. The `results/` directory in the accompanying code repository is currently empty. Independent reproduction is the most important next step before these figures should be treated as verified rather than historical.
2. **Corrected but not re-measured accuracy.** Section 4.1's reconciliation of four conflicting figures selects the value best supported by a concrete count (the confusion matrix), but this is an internal-consistency correction, not a new measurement.
3. **Nonstandard ResNet-50 activation choice.** The ResNet-50 baseline used sigmoid activation on its output layer rather than softmax, carried over unchanged from the original project configuration; this is a nonstandard choice for multi-class classification and may understate the ResNet-50 baseline's achievable performance under a more conventional configuration.
4. **Single dataset, single split.** All results are reported on one 80/20 split of one dataset; no cross-validation or external validation cohort was used.
5. **Qualitative-only interpretability check.** The Grad-CAM analysis in Section 4.3 is qualitative; no quantitative overlap metric against annotated tumor regions was computed.
6. **Missing original figures.** Several figures referenced in the original thesis (data insight plots, architecture diagrams, training curves) were not available in machine-readable form for this revision and are not reproduced here; the accompanying repository's `results/` directory should be populated by a future retraining pass.
7. **No inference-time or memory measurement.** Section 3.5's parameter-count comparison is an architecture-level estimate; no latency or peak-memory measurement was taken, so the resource-efficiency framing is only partially substantiated (see Section 4.4 for the explicit scope of this claim).
8. **No statistical significance test.** The dense EfficientNet vs. ResNet-50 accuracy comparison (Section 4.1) was not evaluated with a formal significance test, and per-image prediction records needed to compute one retroactively were not available for this revision.
9. **Uncontrolled baseline comparison.** The ResNet-50 baseline's nonstandard sigmoid output activation (Section 3.4) is a confound in the head-to-head comparison; the accuracy gap may partly reflect this configuration difference rather than a pure architectural effect.

## 6. Conclusion and Future Work

This paper revisited a dense-layer-augmented EfficientNetB0 classifier for four-class brain tumor MRI classification, trained on a single 8 GB consumer GPU, and compared it against a matched-condition ResNet-50 baseline. After resolving internal inconsistencies in the original 2023 project's reported accuracy figures using the confusion-matrix-derived count as the authoritative source, the dense EfficientNet reaches 98.77% test accuracy against the ResNet-50 baseline's 96.32% — a directional finding, not a statistically or activation-function-controlled comparison (Section 4.1, Limitation 8-9) — with Grad-CAM visualizations showing activation concentrated on tumor-proximal image regions for correctly classified cases. Rather than positioning this result against the current accuracy ceiling of 99%+ established by 2024-2026 EfficientNet-variant and hybrid CNN-Transformer studies, we contribute an architecture-level parameter-efficiency measurement (~6.67M vs. 23.5M trainable parameters, Section 3.5) as partial, measurable evidence toward a resource-efficiency framing, while explicitly disclosing that inference-time and deployment-hardware claims remain unmeasured (Limitation 7). We regard this scoped, partially-substantiated framing as more defensible than an unqualified resource-efficiency claim would have been.

Future work should prioritize, in order: (1) independent retraining to replace the inherited 2023 figures with verified measurements, paired with a corrected softmax ResNet-50 baseline and a formal significance test (e.g., McNemar's) to make the model comparison conclusive rather than directional; (2) inference-time and peak-memory benchmarking to complete the resource-efficiency claim beyond the architecture-level parameter count reported here; (3) a quantitative interpretability metric comparing Grad-CAM activation regions against radiologist-annotated tumor masks; (4) a second explainability method (SHAP or LIME) for cross-method agreement checking, following [13], [14]; (5) a lightweight ViT or hybrid CNN-Transformer comparison point, following the resource-efficiency benchmark established by [15]; and (6) external validation on a dataset not drawn from the same source corpus as the training data.

---

## Data Availability Statement

The dataset used in this study is the publicly available Kaggle Brain Tumor MRI Dataset, derived from the figshare brain tumor dataset of Cheng [18]. Code for data loading, model training, evaluation, and Grad-CAM visualization is available at the accompanying repository: `github.com/smile-plzz/brain-tumor-classification-efficientnet-gradcam`. Trained model checkpoints and the `results/` directory (confusion matrices, Grad-CAM output images) are not currently populated in the repository and are flagged in Section 5 as a reproducibility gap pending a future retraining pass.

## Ethics Declaration

This study uses a publicly available, de-identified MRI dataset and did not involve new data collection from human subjects. No institutional ethics review was required for the original 2023 project or this revision.

## Author Contributions (CRediT)

**MD Kawser Islam**: Methodology, Software, Investigation, Original 2023 draft. **Shamin Yeaser Shams**: Methodology, Software, Investigation, Original 2023 draft. **MD. Ismail Hossain**: Methodology, Software, Investigation, Original 2023 draft, Writing – review & editing (2026 revision), Project administration (2026 revision). **Dr. Mohammad Monirujjaman Khan**: Supervision, Validation.

## Conflict of Interest Statement

The authors declare no conflict of interest.

## Funding Acknowledgment

No external funding was received for this project.

## AI Disclosure Statement

This 2026 revision was drafted with AI assistance (Claude, Anthropic) under the academic-research-skills pipeline, using the original 2023 thesis text, the accompanying code repository, and an AI-assisted literature search (Section 2.2-2.4 sources) as source material. The AI-assisted process included: literature search and synthesis (Section 2), prose rewriting of the original thesis content, the accuracy-figure reconciliation described in Section 4.1, and structural/citation formatting. All AI-assisted claims and citations are subject to the verification process described in the accompanying pipeline's integrity-check stage. A human author (MD. Ismail Hossain) reviewed and is responsible for the final content.

---

## References

[1] A. Pradhan, D. Mishra, K. Das, G. Panda, S. Kumar, and M. Zymbler, "On the Classification of MR Images Using 'ELM-SSA' Coated Hybrid Model," *Mathematics*, vol. 9, no. 9, p. 2095, 2021.

[2] A. V. N. Reddy, C. P. Krishna, P. K. Mallick, S. K. Satapathy, P. Tiwari, M. Zymbler, and S. Kumar, "Analyzing MRI scans to detect glioblastoma tumor using hybrid deep belief networks," *J. Big Data*, vol. 7, p. 35, 2020.

[3] M. Tan and Q. V. Le, "EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks," *arXiv preprint arXiv:1905.11946*, 2019.

[4] R. R. Selvaraju, M. Cogswell, A. Das, R. Vedantam, D. Parikh, and D. Batra, "Grad-CAM: Visual explanations from deep networks via gradient-based localization," in *Proc. IEEE Int. Conf. Comput. Vis. (ICCV)*, Venice, Italy, 2017, pp. 618-626.

[5] J. Cheng, W. Huang, S. Cao, R. Yang, W. Yang, Z. Yun, Z. Wang, and Q. Feng, "Enhanced performance of brain tumor classification via tumor region augmentation and partition," *PLoS ONE*, vol. 10, e0144479, 2015.

[6] M. M. Badža and M. Č. Barjaktarović, "Classification of brain tumors from MRI images using a convolutional neural network," *Appl. Sci.*, vol. 10, p. 1999, 2020.

[7] F. J. Díaz-Pernas, M. Martínez-Zarzuela, M. Antón-Rodríguez, and D. González-Ortega, "A deep learning approach for brain tumor classification and segmentation using a multiscale convolutional neural network," *Healthcare*, vol. 9, p. 153, 2021.

[8] S. Das, O. R. Aranya, and N. N. Labiba, "Brain tumor classification using a convolutional neural network," in *Proc. 2019 1st Int. Conf. Adv. Sci. Eng. Robot. Technol. (ICASERT)*, Dhaka, Bangladesh, 2019, pp. 1-5.

[9] I. Abd El Kader, G. Xu, Z. Shuai, S. Saminu, I. Javaid, and I. Salim Ahmad, "Differential deep convolutional neural network model for brain tumor classification," *Brain Sci.*, vol. 11, p. 352, 2021.

[10] F. Zulfiqar, U. I. Bajwa, and Y. Mehmood, "Multi-class classification of brain tumor types from MR images using EfficientNets," *Biomed. Signal Process. Control*, vol. 84, art. 104777, Jul. 2023, doi: 10.1016/j.bspc.2023.104777.

[11] A. Ishaq, F. U. M. Ullah, P. Hamandawana, D.-J. Cho, and T.-S. Chung, "Improved EfficientNet Architecture for Multi-Grade Brain Tumor Detection," *Electronics*, vol. 14, no. 4, art. 710, Feb. 2025, doi: 10.3390/electronics14040710.

[12] M. Musthafa, T. R. Mahesh, V. Vinoth Kumar, and S. Guluwadi, "Enhancing brain tumor detection in MRI images through explainable AI using Grad-CAM with ResNet-50," *BMC Med. Imaging*, vol. 24, art. 107, May 2024, doi: 10.1186/s12880-024-01292-7.

[13] Y. Gharaibeh, "Enhancing interpretability in brain tumor detection: Leveraging Grad-CAM and SHAP for explainable AI in MRI-based cancer diagnosis," *Appl. Comput. Sci.*, Sep. 2025, doi: 10.35784/acs_7375.

[14] [Yoon] and [Lin], "Brain Tumor Classification in MRI: Insights From LIME and Grad-CAM Explainable AI Techniques," *IEEE Access*, 2025, doi: 10.1109/ACCESS.2025.3603272. [Given names not resolved by CrossRef metadata — verify against publisher page before final submission.]

[15] O. Attallah and I. Pacal, "Comparative evaluation of lightweight convolutional neural network and vision transformer models for multi-class brain tumor classification using merged large MRI datasets," *Chemometrics Intell. Lab. Syst.*, Feb. 2026, doi: 10.1016/j.chemolab.2025.105609.

[16] [Thottempudi] et al., "An Explainable Hybrid CNN-Transformer Framework with Aquila Optimization for MRI-Based Brain Tumor Classification," *medRxiv preprint*, Oct. 2025, doi: 10.1101/2025.10.14.25338038. [Preprint, not yet peer-reviewed — flag accordingly if cited in a submission.]

[17] [Hong], [Wu], and [Zhu], "A Brain Tumor Classification algorithm based on VIT-B/16," in *Proc. 2024 36th Chinese Control and Decision Conf. (CCDC)*, May 2024, doi: 10.1109/CCDC62350.2024.10587761. [Candidate match by CrossRef bibliographic search; the specific 99.92%-accuracy figure attributed to this line of work in Section 2.4 could not be independently confirmed against this DOI's abstract in this pass — verify against primary source before treating as an established figure.]

[18] J. Cheng, "Brain tumor dataset," *Figshare*, 2017. Available: https://figshare.com/articles/dataset/brain_tumor_dataset/1512427

[19] D. R. Nayak, N. Padhy, and B. K. Swain, "Brain Tumor Detection and Extraction using Type-2 Fuzzy with Morphology," *Int. J. Emerg. Technol.*, vol. 11, pp. 840-844, 2020.

[20] K. He, X. Zhang, S. Ren, and J. Sun, "Deep Residual Learning for Image Recognition," in *Proc. IEEE Conf. Comput. Vis. Pattern Recognit. (CVPR)*, 2016, pp. 770-778.

**[CITATION VERIFICATION NOTE — updated at Stage 2.5]**: References [10]-[16] were cross-checked against CrossRef DOI metadata (author family names, journal, volume/article number, publication date all confirmed to match the source found in Stage 1's web search). [14] resolved only family names via CrossRef (given names unresolved — verify before submission). [16] is an unreviewed preprint. [17] is a candidate-match only: CrossRef bibliographic search returned a plausible DOI for a ViT-B/16 brain tumor classification paper, but the specific 99.92% accuracy figure attributed to it in Section 2.4 was not independently confirmed against that DOI's content — this citation should be either dropped or the figure re-verified against the primary source before submission. One additional correction from this check: [10] is a three-class study, not four-class as loosely implied in the original draft — corrected in Section 2.2.
