function NotFoundCompo() {
  return (
    <div className="flex flex-col items-center text-center">
      <img src="../images/notFoundComponent.svg" alt="image of Not Found" width={241} height={200} />
      <h1 className="mb-10 text-5xl font-medium">There is nothing here</h1>
      <p>
        Create an invoice by clicking the New Invoice button and get started{" "}
      </p>
    </div>
  );
}

export default NotFoundCompo;
