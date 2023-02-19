# fds-carousel
Carousel similar to bootstrap using Web component.


### Preview:
![Alt text](https://i.ibb.co/9YDyJwJ/thumbnail.png "Both sizes")

>&nbsp;
> **Config**
> Using two values "speed" and "heightimg"
> default values is 
> - speed: 4000.
> - heightimg: 100%
>&nbsp;

---

##Structure

```html
<fds-carousel speed="5000" heightimg="300px">
        <div class="sections">
        <!--Slide 1-->
          <section class="carousel-screen">          
            <a href="url.com">
              <picture>
                <source media="(max-width:992px)" srcset="https://picsum.photos/seed/picsum/500/700?random=1">
                <source media="(min-width:992px)" srcset="https://picsum.photos/seed/picsum/900/450?random=1">
                <img src="https://picsum.photos/seed/picsum/900/450?random=1" alt="Image 1" loading="lazy">
              </picture>
            </a>
            <section class="text-container">
              <p>Chicago</p>
              <p>Thank you, Chicago!</p>
            </section>
          </section>          
        <!--Slide 2-->
          <section class="carousel-screen">          
            <a href="url.com">
              <picture>
                <source media="(max-width:992px)" srcset="https://picsum.photos/seed/picsum/500/700?random=1">
                <source media="(min-width:992px)" srcset="https://picsum.photos/seed/picsum/900/450?random=1">
                <img src="https://picsum.photos/seed/picsum/900/450?random=1" alt="Image 2" loading="lazy">
              </picture>
            </a>
            <section class="text-container">
              <p>Chicago</p>
              <p>Thank you, Chicago!</p>
            </section>
          </section>          
        <!--Slide 3-->
          <section class="carousel-screen">          
            <a href="url.com">
              <picture>
                <source media="(max-width:992px)" srcset="https://picsum.photos/seed/picsum/500/700?random=1">
                <source media="(min-width:992px)" srcset="https://picsum.photos/seed/picsum/900/450?random=1">
                <img src="https://picsum.photos/seed/picsum/900/450?random=1" alt="Image 3" loading="lazy">
              </picture>
            </a>
            <section class="text-container">
              <p>Chicago</p>
              <p>Thank you, Chicago!</p>
            </section>
          </section>          
        </div>     
      </fds-carousel>
```

**Preview** [Here](https://aei2023.github.io/fds-carousel/)