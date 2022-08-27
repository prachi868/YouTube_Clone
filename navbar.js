function navbar() {
    return `  <nav class="navbar navbar-expand-md d-flex justify-content-between">
    <a class="navbar-brand" href="index.html">
      <img
        class="d-inline-block align-top mx-4"
        src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
        alt=""
        style="height: 40px"
      />
    </a>
    

    <form class="form-inline w-50">
      <div class="input-group">
        <input
          class="form-control w-50 mr-sm-2"
          type="search"
          id="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          class="btn border hover-shadow my-2 my-sm-0"
          style="width: 70px"
          type="submit"
          id="submit"
        >
          <i class="bi bi-search"></i>
        </button>
        <button class="btn mx-2 bg-light rounded-circle">
          <i class="bi bi-mic-fill h5"></i>
        </button>
      </div>
    </form>
    <div class="d-md-inline mx-4 d-none">
      <button class="btn rounded-circle">
        <i class="h5 bi bi-camera-reels"></i>
      </button>
      <button class="btn rounded-circle">
        <i class="bi h5 bi-grid-3x3-gap"></i>
      </button>
      <button class="btn rounded-circle">
        <i class="bi h5 bi-bell"></i>
      </button>
      <button class="btn rounded-circle">
        <i class="bi h5 bi-person-circle"></i>
      </button>
    </div>
  </nav>`;
}

export default navbar();