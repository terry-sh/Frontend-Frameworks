#include <emscripten/bind.h>
#include <string>

using namespace emscripten;

class Cat {
private:
  std::string name;
public:
  Cat(std::string name) {
    this->name = name;
  }

  std::string greet() {
    return this->name;
  }

  static std::string getName(const Cat& self) {
    return self.name;
  }
};

EMSCRIPTEN_BINDINGS(cat_module) {
  class_<Cat>("Cat")
    .constructor<std::string>()
    .function("greet", &Cat::greet)
    .class_function("getName", &Cat::getName);
}