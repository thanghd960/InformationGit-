puts File.absolute_path('test.txt')

# puts File.basename(File.absolute_path('test.txt'))
# puts File.basename(File.absolute_path('test.txt'),'.txt')
# puts File.dirname(File.absolute_path('test.txt'))
# puts File.extname(File.absolute_path('test.txt'))
# puts File.basename(File.absolute_path('test.txt'),File.extname(File.absolute_path('test.txt')))
# # puts "test rb"
# puts File.join("/home/thangpc/Desktop/RubyLearning/ruby","thang.io")
puts File.atime("test.txt")