# Testability Interview

An interview that aims to show couple of basic refactorings towards better testability. Click the links to see actual code changes...

### Run the tests with karma

````bash
npm install -g karma
karma start
````

### Here it is...

*I have [this code](https://github.com/vojtajina/testability-interview/commit/d6e24befb065a5bcc642af48d02bcc7fbc1ab06b) and want to test the message encoding. To make it easier, I [extracted the encoding into a separate method](https://github.com/vojtajina/testability-interview/commit/dcecb599d417feafa8d4d6c39aed71d6a4417982), but it still feels crazy. Why do I have to care about Backend? I don’t need it for encoding messages at all...*

**Oh, boy, you should use Dependency Injection pattern and separate instantiating/assembling from the actual logic. Notificator is too much coupled to its dependency. It basically knows too much - what backend and how to instantiate it, these should not be responsibilities of Notificator.**

**Try a [little refactoring](https://github.com/vojtajina/testability-interview/commit/a366b4e925ddeaf989156064e3b6c0771fe9612e) and see how it improves your test.**

*Woow, that’s pretty cool, now the test is really simple!*

**Yep, because Notifier does not care how to instantiate the backend anymore. It’s responsibility of the creator. If you wanna make the whole assembling simpler and declarative, use some Dependency Injection Framework, that can do the boilerplate for you. It’s like magic...**

*Magic? Sure. So, now I can [inject even the notification_batch_limit](https://github.com/vojtajina/testability-interview/commit/882e00860c365017358aef7d3765e68fe122510f), right?*

**Exactly.**

... later ...

*OMG. This is insane! Seriously!*

**What’s up buddy?**

*Watch [this test](https://github.com/vojtajina/testability-interview/commit/013d096b82d1445626618ce671507cedc2661df0) I just added. It’s failing, but when I run only this test, it passes!*

**I smell global state here ;-) Let me have a look...**

**There you go,  Notifier.queue is a global state shared between all tests. You could reset that before each test, but it will beat you again... and you will spend many hours debugging. It’s better to avoid global state. Why don’t you just make the queue an internal variable?**

*Not possible, I need to access the queue from my status reporter, so that it can show a little icon, indicating how many messages are pending...*

**Ok, fair enough. Then, [inject the queue into Notifier as any other dependency](https://github.com/vojtajina/testability-interview/commit/091f6e14b377e60592726d89b295784a6fe013e3). And inject the same queue into the status reporter as well.**

*Of course. Inject it! Writing testable code seems to be just about injecting everything.*

**Pretty much. But don’t tell anybody.**

*But I still don’t like these tests for send method. I really don’t thinking injecting something can help me here.*

**Well, the send method is breaking the Law of Demeter.**

*What? I thought breaking the law was a good thing, no?*

**Well, yes. But not when it comes to the Law of Demeter.**

*So what’s the deal with Mr. Demeter?*

**You are passing too much stuff into the send method. It really needs only the user’s email, nothing else. Why don’t you change the argument to just email?**

*Something like [this](https://github.com/vojtajina/testability-interview/commit/8bea3fe333ef51a5474caed20779d0fa54d22e99)?*

**Yep, that’s exactly what I meant. Notice, how the tests got simpler...**

*This is awesome, I think I’m getting it...*

*So am I a Test Master, now that I inject everything everywhere?*

**Not yet! To become a true Test Master, one has to read [Miško’s blog](http://misko.hevery.com/) about testing.**

--

Released under [WTFPL](http://www.wtfpl.net/) License.
