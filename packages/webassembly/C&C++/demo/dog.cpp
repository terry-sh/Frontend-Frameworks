#include <emscripten/bind.h>

using namespace emscripten;

class Dog {
private:
  int age;
public:
  Dog(int age) {
    this->age = age;
  }

  bool isOld() {
    return this->age > 5;
  }

  static int getAge(const Dog& self) {
    return self.age;
  }
};

EMSCRIPTEN_BINDINGS(cat_module) {
  class_<Dog>("Dog")
    .constructor<int>()
    .function("isOld", &Dog::isOld)
    .class_function("getAge", &Dog::getAge);
}