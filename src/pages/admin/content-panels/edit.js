// // {/* <div>
// // {showStore ? (
// //   <div
// //     className="container1 enter "
// //     style={{ position: "relative", left: "-318px" }}
// //   >
// //     <div className="rowExplaine">
// //       <div style={{ display: "flex", gap: "30px" }}>
// //         <p>ویرایش کالا</p>
// //         <div
// //           style={{
// //             position: "relative",
// //             left: "-540px",
// //           }}
// //           className="butCancel"
// //           onClick={() => {
// //             setShowStore(false);
// //           }}
// //         >
// //           X
// //         </div>
// //       </div>
// //       <p>تصویر کالا</p>

// //       <input
// //         style={{ left: "-107px", position: "relative" }}
// //         defaultValue={thumbnail}
// //         type="file"
// //         placeholder="تصویر کالا"
// //         accept="image/*"
// //         onChange={(event) => {
// //           onImageChange(event);
// //         }}
// //       />

// //       <img
// //         style={{
// //           left: "-70px",
// //           position: "relative",
// //           width: "50px",
// //           height: "50px",
// //         }}
// //         src={`${URL}/${thumbnail}`}
// //         alt="تصویر کالا"
// //       />
// //       <p>نام کالا</p>
// //       <input
// //         defaultValue={name}
// //         required
// //         type="text"
// //         onChange={(event) => {
// //           setName(event.target.value);
// //         }}
// //       />
// //     </div>
// //     <p>موجودی</p>
// //     <input
// //       defaultValue={quantity}
// //       required
// //       type="text"
// //       onChange={(event) => {
// //         setQuantity(event.target.value);
// //       }}
// //     />
// //     <p>دسته بندی</p>
// //     <select
// //       name="category"
// //       className="categoryInput"
// //       placeholder="دسته بندی"
// //       id={""}
// //       required
// //       onChange={(event) => {
// //         setCategory(event.target.value);
// //       }}
// //     >
// //       <option value={1} defaultValue={category} className="pant-fit">
// //         شلوار
// //       </option>
// //       <option value={2} defaultValue={category} className="t-shirt">
// //         لباس دخترانه تابستانی
// //       </option>
// //       <option value={3} defaultValue={category} className="hoodi">
// //         لباس دخترانه زمستانی
// //       </option>
// //     </select>
// //     <select
// //       name="subcategory"
// //       className="subcategoryInput"
// //       placeholder="زیر دسته بندی"
// //       id={""}
// //       required
// //       onChange={(event) => {
// //         setSubcategory(event.target.value);
// //       }}
// //     >
// //       <option value={1} className="pant">
// //         جین
// //       </option>
// //       <option value={2} defaultValue={subcategory} className="pant-fit">
// //         مام فیت
// //       </option>
// //       <option value={3} defaultValue={subcategory} className="t-shirt">
// //         تی شرت
// //       </option>
// //       <option value={4} defaultValue={subcategory} className="hoodi">
// //         هودی
// //       </option>
// //     </select>

// //     <p>قیمت کالا</p>
// //     <input
// //       defaultValue={price}
// //       required
// //       type="text"
// //       onChange={(event) => {
// //         setPrice(event.target.value);
// //       }}
// //     />
// //     <p>توضیحات</p>
// //     {/* -------------------------Text Edditor----------------------  */}
// //     <div dir="rtl" className="App" style={{ marginBottom: "20px" }}>
// //       <CKEditor
// //         editor={ClassicEditor}
// //         data={description}
// //         onReady={(editor) => {}}
// //         onChange={(event, editor) => {
// //           const data = editor.getData();
// //         }}
// //         onBlur={(event, editor) => {}}
// //         onFocus={(event, editor) => {}}
// //       />
// //     </div>
// //     <Button
// //       size="sm"
// //       variant="success"
// //       type="submit"
// //       className="btn-save enter"
// //       onClick={(event) => {
// //         handleSave(event);
// //       }}
// //     >
// //       <FontAwesomeIcon icon={faSave} />
// //       ذخیره
// //     </Button>
// //     <Button
// //       size="sm"
// //       variant="info"
// //       type="reset"
// //       onClick={(e) => resetInputs(e)}
// //     >
// //       <FontAwesomeIcon icon={faUndo} /> ریست
// //     </Button>
// //   </div>
// // ) : null}
// // </div> */}




// <div
// className="container1 enter "
// style={{ position: "relative", left: "-318px" }}
// >
// <div className="rowExplaine">
//   <div style={{ display: "flex", gap: "30px" }}>
//     <p>افزودن کالا</p>
//     <div
//       className="butCancel"
//       onClick={() => {
//         setShowStore(false);
//       }}
//       style={{
//         position: "relative",
//         left: "-540px",
//       }}
//     >
//       X
//     </div>
//   </div>
//   <p>تصویر کالا</p>

//   <input
//     style={{ left: "-10px", position: "relative" }}
//     type="file"
//     placeholder="تصویر کالا"
//     accept="image/*"
//     onChange={(e) => {
//       onImageChange(e);
//     }}
//   />
//   <img
//     style={{
//       left: "-70px",
//       position: "relative",
//       width: "50px",
//       height: "50px",
//     }}
//     src={thumbnail}
//     alt="پیش فرض"
//     required
//   />
//   <p>نام کالا</p>
//   <input
//     value={name}
//     required
//     type="text"
//     onChange={(event) => {
//       handleName(event);
//     }}
//   />
//   <p>{nameErr}</p>
// </div>
// <p>دسته بندی</p>
// <select
//   name="category"
//   className="categoryInput"
//   placeholder="دسته بندی"
//   id={""}
//   required
//   //value={genre1}
//   onChange={(event) => {
//     handleCategory(event);
//   }}
// >
//   <option value={Number(1)} defaultValue={category} className="">
//     شلوار
//   </option>

//   <option value={Number(2)} defaultValue={category} className="">
//     لباس دخترانه تابستانی{" "}
//   </option>
//   <option value={Number(3)} defaultValue={category} className="">
//     لباس دخترانه زمستانی{" "}
//   </option>
// </select>
// <p>{categoryErr}</p>
// <select
//   name="subcategory"
//   className="subcategoryInput"
//   placeholder="زیر دسته بندی"
//   id={""}
//   required
//   onChange={(event) => {
//     setSubcategory(event.target.value);
//   }}
// >
//   <option value={1} defaultValue={subcategory} className="pant">
//     جین
//   </option>
//   <option value={2} defaultValue={subcategory} className="pant-fit">
//     مام فیت
//   </option>
//   <option value={3} defaultValue={subcategory} className="t-shirt">
//     تی شرت
//   </option>
//   <option value={4} defaultValue={subcategory} className="hoodi">
//     هودی
//   </option>
// </select>
// <p>موجودی</p>
// <input
//   defaultValue={quantity}
//   required
//   type="text"
//   onChange={(event) => {
//     setQuantity(event.target.value);
//   }}
// />
// <p>قیمت کالا</p>
// <input
//   value={price}
//   required
//   type="text"
//   onChange={(event) => {
//     handlePrice(event);
//   }}
// />
// <p>توضیحات</p>
// {/* -------------------------Text Edditor----------------------  */}
// <CKEditor
//   required
//   editor={ClassicEditor}
//   data={description}
//   onReady={(editor) => {
//     console.log("Editor is ready to use!", editor);
//   }}
//   onChange={(event, editor) => {
//     // const data = editor.getData();
//     // console.log({ event, editor, data });
//     setDescription(editor.getData());
//     // if (event.target.value.length < 2) {
//     //   setDescriptionErr(" طول کاراکتر وارد شده کوتاه است");
//     // } else if (event.target.value === "") {
//     //   setDescriptionErr("این قسمت نمی تواند خالی باشد");
//     // } else {
//     //   setDescriptionErr("");
//     // }
//   }}
//   onBlur={(event, editor) => {
//     console.log("blure", editor);
//   }}
//   onFocus={(event, editor) => {
//     console.log("focus", editor);
//   }}
// />
// <p>{descriptionErr}</p>
// <button
//   disabled={!isValid}
//   onClick={(event) => {
//     handleSave(event);
//   }}
//   className="btn-save enter"
// >
//   ذخیره
// </button>
// </div>